from django.db import models
from users.models import User
from group.models import Group


class Child(models.Model):
    GENDER_CHOICES = (
        ('муж', 'Муж'),
        ('жен', 'Жен'),
    )

    parent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='children'
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    birth_date = models.DateField()

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children'
    )

    allergies = models.TextField(blank=True)
    medical_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'