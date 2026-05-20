from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ParentInvite
from children.models import ChildParentRelation

class ParentInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentInvite
        fields = '__all__'
        read_only_fields = ['token', 'used', 'created_at', 'expires_at']
        
User = get_user_model()

class AcceptInviteSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        print("INCOMING TOKEN:", data['token'])

        try:
            invite = ParentInvite.objects.get(token=data['token'])
            print("FOUND INVITE:", invite)
        except ParentInvite.DoesNotExist:
            print("INVITE NOT FOUND")
            raise serializers.ValidationError("Invalid invite token")

        if not invite.is_valid():
            print("INVITE NOT VALID")
            raise serializers.ValidationError("Invite expired or used")

        data['invite'] = invite
        return data

    def create(self, validated_data):
        invite = validated_data['invite']

        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password'],
            role='parent'
        )

        ChildParentRelation.objects.create(
            child=invite.child,
            parents=user,
            relation_type='guardian'
        )

        invite.used = True
        invite.save()

        return user