from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Event
from .serializers import EventSerializer


class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        user = self.request.user

        # ADMIN
        if user.role == 'admin':
            return Event.objects.all()

        # PARENT
        if user.role == 'parent':
            return Event.objects.filter(
                group__children__parent=user
            ).distinct()

        # # EDUCATOR
        # if user.role == 'educator':
        #     return Event.objects.filter(
        #         group__educators=user
        #     ).distinct()

        return Event.objects.none()