from .models import Child


def get_accessible_children(user):
    return Child.objects.filter(parents=user).distinct()