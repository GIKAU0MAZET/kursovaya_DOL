from django.db import models
from children.models import Child
from users.models import User


class HealthRecord(models.Model):
    child = models.ForeignKey(
        Child,
        on_delete=models.CASCADE,
        related_name="health_records"
    )

    temperature = models.FloatField(null=True, blank=True)

    condition = models.CharField(
        max_length=255,
        blank=True
    )

    notes = models.TextField(blank=True)

    recorded_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)