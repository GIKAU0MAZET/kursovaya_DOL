from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Child
from .serializers import ChildSerializer
from .services import get_accessible_children
import logging

logger = logging.getLogger(__name__)

class ChildListCreateView(generics.ListCreateAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_accessible_children(self.request.user)

    def perform_create(self, serializer):
        # обычно детей создаёт staff, поэтому можно оставить без изменений
        serializer.save()


class ChildDetailView(generics.RetrieveAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "educator":
            return Child.objects.filter(group__educators__id=user.id)
        if user.role == "parent":
            return Child.objects.filter(parents=user)
        return Child.objects.none()
    
class MyGroupView(generics.ListAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'educator':
            return Child.objects.filter(group__educators=user)
        return Child.objects.none()