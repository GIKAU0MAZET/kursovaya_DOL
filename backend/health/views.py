from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import HealthRecord
from .serializers import HealthSerializer

class HealthListCreateView(generics.ListCreateAPIView):
    serializer_class = HealthSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        child_id = self.kwargs["child_id"]
        return HealthRecord.objects.filter(child_id=child_id).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)