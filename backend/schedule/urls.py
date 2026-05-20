from django.urls import path

from .views import EventListView, ChildEventStatsView, MarkAttendanceView, EventAttendanceView

urlpatterns = [
    path('', EventListView.as_view()),
    path("<int:child_id>/stats/", ChildEventStatsView.as_view()),
    path("<int:event_id>/attendance/", EventAttendanceView.as_view()),
    path("<int:event_id>/attendance/mark/", MarkAttendanceView.as_view()),
]