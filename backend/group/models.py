from django.db import models
from users.models import User


class Group(models.Model):
    name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )
    
    educators = models.ManyToManyField(
        User,
        related_name="educator_groups",
        limit_choices_to={"role": "educator"},
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name