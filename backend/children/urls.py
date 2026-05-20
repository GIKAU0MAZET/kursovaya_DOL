from django.urls import path
from .views import ChildListCreateView, ChildListView, MyGroupView

urlpatterns = [
    path('', ChildListCreateView.as_view()),
    path('<int:pk>/', ChildListView.as_view()),
    path('group/', MyGroupView.as_view()),
]