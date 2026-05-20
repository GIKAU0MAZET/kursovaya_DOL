from django.urls import path
from .views import HealthListCreateView

urlpatterns = [
    path("<int:child_id>/", HealthListCreateView.as_view()),
]