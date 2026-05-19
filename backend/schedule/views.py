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

        if user.role == "admin":
            return Event.objects.all()

        if user.role == "parent":
            parent_groups = Group.objects.filter(
                child__parents=user
            )

            return Event.objects.filter(
                group__in=parent_groups
            ).distinct()

        if user.role == "educator":
            return Event.objects.filter(
                group__educators=user
            ).distinct()

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
        
class EventAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    # 🔥 получить список детей + их статус
    def get(self, request, event_id):
        event = Event.objects.filter(id=event_id).first()

        if not event:
            return Response(
                {"detail": "Event not found"},
                status=404
            )

        if request.user.role == "educator":
            if not event.group.educators.filter(
                id=request.user.id
            ).exists():
                return Response(
                    {"detail": "Forbidden"},
                    status=403
                )

        children = Child.objects.filter(group=event.group)

        result = []

        for child in children:
            attendance = EventAttendance.objects.filter(
                event=event,
                child=child
            ).first()

            result.append({
                "child_id": child.id,
                "name": child.first_name,
                "status": attendance.status if attendance else None
            })

        return Response(result)

    # 🔥 поставить/обновить attendance
    def post(self, request, event_id):
        event = Event.objects.filter(id=event_id).first()

        if not event:
            return Response(
                {"detail": "Event not found"},
                status=404
            )

        if request.user.role == "educator":
            if not event.group.educators.filter(
                id=request.user.id
            ).exists():
                return Response(
                    {"detail": "Forbidden"},
                    status=403
                )

        child_id = request.data["child_id"]
        status_value = request.data["status"]

        child = Child.objects.filter(id=child_id).first()

        if not child:
            return Response(
                {"detail": "Child not found"},
                status=404
            )

        if child.group != event.group:
            return Response(
                {"detail": "Child not in event group"},
                status=400
            )

        attendance, created = EventAttendance.objects.update_or_create(
            event=event,
            child=child,
            defaults={
                "status": status_value
            }
        )

        return Response({
            "child_id": child.id,
            "status": attendance.status,
            "created": created
        })