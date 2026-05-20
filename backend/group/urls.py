from django.urls import path
from .views import MyGroupView

urlpatterns = [
    path("my-group/", MyGroupView.as_view()),
]