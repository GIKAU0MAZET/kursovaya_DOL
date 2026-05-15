from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import DiaryEntry
from .serializers import DiaryEntrySerializer


class DiaryEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = DiaryEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DiaryEntry.objects.all()

    def perform_create(self, serializer):
        serializer.save(educator=self.request.user)