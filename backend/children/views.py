from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Child
from .serializers import ChildSerializer


class ChildListCreateView(generics.ListCreateAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Child.objects.filter(parent=self.request.user)

    def perform_create(self, serializer):
        serializer.save(parent=self.request.user)
        
class ChildDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Child.objects.filter(parent=self.request.user)