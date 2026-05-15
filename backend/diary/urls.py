from django.urls import path
from .views import DiaryEntryListCreateView

urlpatterns = [
    path('', DiaryEntryListCreateView.as_view()),
]