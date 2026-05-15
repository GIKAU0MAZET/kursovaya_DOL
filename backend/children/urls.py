from django.urls import path
from .views import ChildListCreateView, ChildDetailView

urlpatterns = [
    path('', ChildListCreateView.as_view()),
    path('<int:pk>/', ChildDetailView.as_view()),
]