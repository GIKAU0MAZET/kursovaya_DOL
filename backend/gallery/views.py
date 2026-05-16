from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from .models import GalleryImage
from .serializers import (
    GalleryImageSerializer
)


class GalleryListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = (
        GalleryImageSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_queryset(self):
        user = self.request.user

        # ADMIN
        if user.role == 'admin':
            return GalleryImage.objects.all()

        # PARENT
        if user.role == 'parent':
            return GalleryImage.objects.filter(
                group__children__parent=user
            ).distinct()

        return GalleryImage.objects.none()

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            uploaded_by=self.request.user
        )