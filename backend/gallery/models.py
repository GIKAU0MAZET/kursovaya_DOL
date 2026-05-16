from django.db import models

from users.models import User
from children.models import Child
from group.models import Group


class GalleryImage(models.Model):
    image = models.ImageField(
        upload_to='gallery/'
    )

    caption = models.CharField(
        max_length=255,
        blank=True
    )
    
    class PhotoType(models.TextChoices):
        EVENT = "event"
        SQUAD = "squad"
        PERSONAL = "personal"

    type = models.CharField(
        max_length=20,
        choices=PhotoType.choices,
        default=PhotoType.PERSONAL
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    child = models.ForeignKey(
        Child,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    event_date = models.DateField(null=True);

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.caption or "Image"