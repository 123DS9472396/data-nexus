from rest_framework import viewsets, permissions, filters
from .models import Pipeline, PipelineRun
from .serializers import PipelineSerializer, PipelineRunSerializer

class PipelineViewSet(viewsets.ModelViewSet):
    serializer_class   = PipelineSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ["name", "status", "source"]
    ordering_fields    = ["created_at", "status"]

    def get_queryset(self):
        return Pipeline.objects.filter(owner=self.request.user)

class PipelineRunViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class   = PipelineRunSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PipelineRun.objects.filter(
            pipeline__owner=self.request.user
        ).order_by("-started_at")
