from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import DiaryEntry, DiaryImage
from .serializers import DiaryEntrySerializer, DiaryImageSerializer
from .permissions import IsEducatorOrAdmin


class DiaryEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = DiaryEntrySerializer

    permission_classes = [
        IsAuthenticated,
        IsEducatorOrAdmin
    ]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            return DiaryEntry.objects.all()

        if user.role == 'educator':
            return DiaryEntry.objects.filter(
                educator=user
            )

        if user.role == 'parent':
            return DiaryEntry.objects.filter(
                child__parents=user
            )

        return DiaryEntry.objects.none()

    def perform_create(self, serializer):
        serializer.save(educator=self.request.user)


class DiaryImageUploadView(generics.CreateAPIView):
    serializer_class = DiaryImageSerializer

    permission_classes = [
        IsAuthenticated,
        IsEducatorOrAdmin
    ]

    parser_classes = [MultiPartParser, FormParser]