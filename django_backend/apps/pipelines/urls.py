from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PipelineViewSet, PipelineRunViewSet

router = DefaultRouter()
router.register("", PipelineViewSet, basename="pipeline")
router.register("runs", PipelineRunViewSet, basename="pipeline-run")

urlpatterns = [path("", include(router.urls))]
