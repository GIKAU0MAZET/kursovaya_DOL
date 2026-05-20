from django.urls import path
from .views import CreateInviteView, AcceptInviteView

urlpatterns = [
    path('', CreateInviteView.as_view()),
    path('accept/', AcceptInviteView.as_view()),
]