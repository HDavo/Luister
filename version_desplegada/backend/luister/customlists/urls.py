from django.urls import include, path

from rest_framework.routers import DefaultRouter

from customlists import views

router = DefaultRouter()
router.register(r'customlist', views.CustomlistViewSet, basename='customlist')

urlpatterns = [
    path('', include(router.urls))
]