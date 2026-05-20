from rest_framework import serializers

from .models import Child


class ChildSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    
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
            'created_at',
            'photo'
        ]
        
    def get_photo(self, obj):
        request = self.context.get('request')
        
        if obj.photo:
            return request.build_absolute_uri(
                obj.photo.url
            )
            
        return None