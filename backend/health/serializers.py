from rest_framework import serializers
from .models import HealthRecord


class HealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = "__all__"
        read_only_fields = ["recorded_by", "created_at"]