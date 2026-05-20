from django.db import models
from group.models import Group
from children.models import Child


class Event(models.Model):
    title = models.CharField(max_length=255)

    description = models.TextField(
        blank=True
    )
    
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='events',
        null=True,
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
    
class EventAttendance(models.Model):
    class Status(models.TextChoices):
        ATTENDED = "attended", "Attended"
        ABSENT = "absent", "Absent"

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="attendances"
    )

    child = models.ForeignKey(
        Child,
        on_delete=models.CASCADE,
        related_name="event_attendances"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices
    )

    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("event", "child")