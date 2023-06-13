from django.urls import include, path

from rest_framework.routers import DefaultRouter

from customlistTrack import views

router = DefaultRouter()
router.register(r'customlistTrack', views.CustomlistTrackViewSet, basename='customlist')

urlpatterns = [
    path('', include(router.urls))
]

