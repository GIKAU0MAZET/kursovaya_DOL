from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Child
from .serializers import ChildSerializer
from .services import get_accessible_children


class ChildListCreateView(generics.ListCreateAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_accessible_children(self.request.user)

    def perform_create(self, serializer):
        # обычно детей создаёт staff, поэтому можно оставить без изменений
        serializer.save()


class ChildDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_accessible_children(self.request.user)
        
    def get_serializer_context(self):
        return {
            'request': self.request
        }