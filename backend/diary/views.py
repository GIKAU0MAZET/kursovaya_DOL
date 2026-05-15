from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework.parsers import MultiPartParser, FormParser
from .models import DiaryEntry, DiaryImage
from .serializers import DiaryEntrySerializer, DiaryImageSerializer


class DiaryEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = DiaryEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DiaryEntry.objects.all()

    def perform_create(self, serializer):
        serializer.save(educator=self.request.user)
        
class DiaryImageUploadView(generics.CreateAPIView):
    serializer_class = DiaryImageSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]