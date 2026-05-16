from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=255)

    description = models.TextField(
        blank=True
    )

    date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    location = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title