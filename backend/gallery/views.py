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

from group.models import Group
class GalleryListCreateView(generics.ListCreateAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            qs = GalleryImage.objects.all()
        elif user.role == 'parent':
            parent_groups = Group.objects.filter(child__parents=user)
            qs = GalleryImage.objects.filter(group__in=parent_groups).distinct()
        elif user.role == 'educator':
            qs = GalleryImage.objects.filter(group__educators=user)
        else:
            return GalleryImage.objects.none()

        photo_type = self.request.query_params.get("type")
        if photo_type in ("event", "squad", "personal"):
            qs = qs.filter(type=photo_type)
        return qs.order_by("-event_date", "-id")

    def perform_create(self, serializer):
        user = self.request.user

        group = Group.objects.filter(educators=user).first()

        print("USER:", user)
        print("GROUP:", group)

        serializer.save(
            uploaded_by=user,
            group=group
        )