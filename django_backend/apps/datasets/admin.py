from django.contrib import admin
from .models import Dataset

@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    list_display = ('name', 'source_type', 'row_count', 'size_mb', 'last_refreshed')
    list_filter = ('source_type',)
    search_fields = ('name',)
