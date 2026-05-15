from rest_framework import serializers
from .models import DiaryEntry, DiaryImage


class DiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = '__all__'
        read_only_fields = ['educator']
        
class DiaryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryImage
        fields = '__all__'