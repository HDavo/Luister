from django.urls import include, path

from rest_framework.routers import DefaultRouter

from favoritetracks import views

router = DefaultRouter()
router.register(r'favoritetrack', views.FavoriteTrackViewSet, basename='favoritetrack')

urlpatterns = [
    path('', include(router.urls))
]