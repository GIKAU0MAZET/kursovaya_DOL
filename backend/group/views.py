from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Group


class MyGroupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        group = Group.objects.filter(educators=request.user).first()

        if not group:
            return Response(None)

        return Response({
            "id": group.id,
            "name": group.name,
            "description": group.description,
        })