from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer

from group.models import Group  

class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            return Event.objects.all()

        if user.role == 'parent':
            # Получаем группы, где есть дети этого родителя
            parent_groups = Group.objects.filter(child__parents=user)
            return Event.objects.filter(group__in=parent_groups).distinct()

        # другие роли
        return Event.objects.none()