from django.urls import path

from .views import EventListView, ChildEventStatsView, MarkAttendanceView

urlpatterns = [
    path('', EventListView.as_view()),
    path("<int:child_id>/stats/", ChildEventStatsView.as_view()),
    path(
    "<int:event_id>/attendance/",
    MarkAttendanceView.as_view()
    ),  
]