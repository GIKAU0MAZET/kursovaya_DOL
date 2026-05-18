from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import ParentInvite
from .serializers import ParentInviteSerializer
from .serializers import AcceptInviteSerializer


class CreateInviteView(generics.CreateAPIView):
    queryset = ParentInvite.objects.all()
    serializer_class = ParentInviteSerializer
    permission_classes = [IsAdminUser]
    
class AcceptInviteView(generics.GenericAPIView):
    serializer_class = AcceptInviteSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "status": "success",
            "user_id": user.id
        })