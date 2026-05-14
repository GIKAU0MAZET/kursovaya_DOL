from django.urls import path
from .views import ChildListCreateView

urlpatterns = [
    path('', ChildListCreateView.as_view()),
]