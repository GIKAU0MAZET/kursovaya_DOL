from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/children/', include('children.urls')),
    path('api/diary/', include('diary.urls')),
    path('api/schedule/', include('schedule.urls')),
    path('api/gallery', include('gallery.urls'))
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)