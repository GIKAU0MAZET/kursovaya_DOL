from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Child
from .serializers import ChildSerializer


class ChildListCreateView(generics.ListCreateAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Только дети, у которых есть использованный инвайт с email текущего пользователя
        return Child.objects.filter(
            parentinvite__email=user.email,
            parentinvite__used=True
        ).distinct()
        
    def get_serializer_context(self):
        return {
            'request': self.request
        }

    def perform_create(self, serializer):
        # Здесь можно оставить создание ребёнка (если нужно)
        serializer.save()


class ChildDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChildSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Child.objects.filter(
            parentinvite__email=user.email,
            parentinvite__used=True
        ).distinct()
        
    def get_serializer_context(self):
        return {
            'request': self.request
        }