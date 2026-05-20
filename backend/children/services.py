from .models import Child


def get_accessible_children(user):
    if user.role == "educator":
        return Child.objects.filter(group__educators=user)
    if user.role == "parent":
        return Child.objects.filter(parents=user)
    if user.role == "medic":
        # Медик видит всех детей (или только детей своего учреждения, если нужно)
        return Child.objects.all()
    return Child.objects.none()