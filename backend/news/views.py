from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q

from .models import News
from .serializers import NewsSerializer


class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticated]


class ChildNewsListCreateView(generics.ListCreateAPIView):
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        child_id = self.kwargs["child_id"]

        return News.objects.filter(
            Q(type="general") |
            Q(type="child", child_id=child_id)
        ).order_by("-created_at")

    def perform_create(self, serializer):
        user = self.request.user

        if user.role not in ["counselor", "admin"]:
            raise PermissionDenied("Only staff can create news")

        child_id = self.kwargs.get("child_id")

        serializer.save(
            child_id=child_id,
            created_by=user
        )