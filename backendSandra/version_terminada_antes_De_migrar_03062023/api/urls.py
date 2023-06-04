

from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('customlists.urls', 'customlists'), namespace='customlists')),
    path('', include(('favoritetracks.urls', 'favoritetracks'), namespace='favoritetracks')),
    path('', include(('customlistTrack.urls', 'customlistTrack'), namespace='customlistTrack')),
    path('', include(('users.urls', 'users'), namespace='users')),
    
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
