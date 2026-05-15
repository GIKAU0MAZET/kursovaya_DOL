from django.urls import path
from .views import (
    DiaryEntryListCreateView,
    DiaryImageUploadView
)

urlpatterns = [
    path('', DiaryEntryListCreateView.as_view()),
    path('upload-image/', DiaryImageUploadView.as_view()),
]