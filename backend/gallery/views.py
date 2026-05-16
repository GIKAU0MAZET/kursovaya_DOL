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


class GalleryListCreateView(generics.ListCreateAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user

        # BASE QUERYSET (доступ)
        if user.role == 'admin':
            qs = GalleryImage.objects.all()

        elif user.role == 'parent':
            qs = GalleryImage.objects.filter(
                group__children__parent=user
            ).distinct()

        else:
            return GalleryImage.objects.none()

        # 🔥 FILTER BY TYPE
        photo_type = self.request.query_params.get("type")

        if photo_type == "events":
            qs = qs.filter(type="event")

        elif photo_type == "squad":
            qs = qs.filter(type="squad")

        elif photo_type == "personal":
            qs = qs.filter(type="personal")

        return qs

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)