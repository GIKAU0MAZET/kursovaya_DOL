from django.urls import path
from .views import ChildListCreateView, ChildDetailView, MyGroupView

urlpatterns = [
    path('', ChildListCreateView.as_view()),
    path('<int:pk>/', ChildDetailView.as_view()),
    path('group/', MyGroupView.as_view()),
]