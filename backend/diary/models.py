from django.db import models
from users.models import User
from children.models import Child


class DiaryEntry(models.Model):
    MOOD_CHOICES = (
        ('happy', 'Happy'),
        ('neutral', 'Neutral'),
        ('sad', 'Sad'),
    )

    child = models.ForeignKey(
        Child,
        on_delete=models.CASCADE,
        related_name='diary_entries'
    )

    educator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_entries'
    )

    title = models.CharField(max_length=255)

    content = models.TextField()

    mood = models.CharField(
        max_length=20,
        choices=MOOD_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class DiaryImage(models.Model):
    diary_entry = models.ForeignKey(
        DiaryEntry,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to='diary_images/'
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Image for {self.diary_entry.title}'