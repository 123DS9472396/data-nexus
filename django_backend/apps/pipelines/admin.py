from django.contrib import admin
from .models import Pipeline, PipelineRun

@admin.register(Pipeline)
class PipelineAdmin(admin.ModelAdmin):
    list_display = ('name', 'source', 'destination', 'status', 'owner')
    list_filter = ('status', 'source')
    search_fields = ('name',)

@admin.register(PipelineRun)
class PipelineRunAdmin(admin.ModelAdmin):
    list_display = ('pipeline', 'status', 'rows_processed', 'started_at', 'completed_at')
    list_filter = ('status',)
