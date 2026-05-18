import uuid
from django.db import models
from django.utils import timezone
from datetime import timedelta

from children.models import Child


class ParentInvite(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE)

    token = models.UUIDField(default=uuid.uuid4, unique=True)

    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    used = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(days=7)
        super().save(*args, **kwargs)

    def is_valid(self):
        return not self.used and timezone.now() < self.expires_at