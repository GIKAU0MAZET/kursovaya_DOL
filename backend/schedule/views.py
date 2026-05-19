from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import EventSerializer
from .models import Event, EventAttendance
from group.models import Group 
from children.models import Child

class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            return Event.objects.all()

        if user.role == 'parent':
            # Получаем группы, где есть дети этого родителя
            parent_groups = Group.objects.filter(child__parents=user)
            return Event.objects.filter(group__in=parent_groups).distinct()

        # другие роли
        return Event.objects.none()
    
class ChildEventStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, child_id):
        child = Child.objects.filter(
            id=child_id,
            parents=request.user
        ).first()
        
        if not child:
            return Response(
                {"detail": "Child not found"},
                status=404
            )
            
        total = Event.objects.filter(group=child.group).count()

        attended = EventAttendance.objects.filter(
            child=child,
            status="attended"
        ).count()

        activity = round((attended / total) * 10) if total > 0 else 0
        
        return Response({
            "attended": attended,
            "total": total,
            "activity": activity
        })
        
class MarkAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        user = request.user

        if user.role not in ["educator", "admin"]:
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN
            )

        attendances = request.data.get("attendances", [])

        for item in attendances:
            child_id = item.get("child_id")
            status_value = item.get("status")

            EventAttendance.objects.update_or_create(
                event_id=event_id,
                child_id=child_id,
                defaults={
                    "status": status_value
                }
            )

        return Response({
            "detail": "Attendance saved"
        })