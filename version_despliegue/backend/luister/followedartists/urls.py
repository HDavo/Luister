from django.urls import include, path

from rest_framework.routers import DefaultRouter

from followedartists import views

router = DefaultRouter()
router.register(r'followedartists', views.FollowedArtistViewSet, basename='followedartists')

urlpatterns = [
    path('', include(router.urls))
]