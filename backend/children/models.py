from django.db import models
from users.models import User
from group.models import Group


class Child(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    birth_date = models.DateField()

    class Gender(models.TextChoices):
        MALE = 'male', 'Муж'
        FEMALE = 'female', 'Жен'

    gender = models.CharField(
        max_length=10,
        choices=Gender.choices
    )

    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)

    allergies = models.TextField(blank=True)
    medical_notes = models.TextField(blank=True)

    parents = models.ManyToManyField(
        'users.User',
        through='ChildParentRelation',
        related_name='children'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    
class ChildParentRelation(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    parent = models.ForeignKey('users.User', on_delete=models.CASCADE)

    relation_type = models.CharField(
        max_length=20,
        choices=(
            ('mother', 'Mother'),
            ('father', 'Father'),
            ('guardian', 'Guardian'),
        )
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('child', 'parent')
        
