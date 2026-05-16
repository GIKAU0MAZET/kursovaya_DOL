from rest_framework import serializers

from .models import Child


class ChildSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(
        source='group.name',
        read_only=True
    )

    class Meta:
        model = Child

        fields = [
            'id',
            'first_name',
            'last_name',
            'birth_date',
            'group',
            'group_name',
            'parent',
            'created_at',
        ]