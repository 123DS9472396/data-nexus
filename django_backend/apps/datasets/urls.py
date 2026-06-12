from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DatasetViewSet

router = DefaultRouter()
router.register("", DatasetViewSet, basename="dataset")
urlpatterns = [path("", include(router.urls))]
