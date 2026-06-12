from django.db import models
from apps.users.models import User

class Pipeline(models.Model):
    STATUS = [
        ("active",  "Active"),
        ("paused",  "Paused"),
        ("failed",  "Failed"),
        ("running", "Running"),
    ]
    name        = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=20, choices=STATUS, default="active")
    source      = models.CharField(max_length=200)   # e.g. "ClickHouse"
    destination = models.CharField(max_length=200)   # e.g. "PostgreSQL"
    schedule    = models.CharField(max_length=100, default="daily")
    owner       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pipelines")
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class PipelineRun(models.Model):
    STATUS = [("success","Success"),("failed","Failed"),("running","Running")]
    pipeline     = models.ForeignKey(Pipeline, on_delete=models.CASCADE, related_name="runs")
    status       = models.CharField(max_length=20, choices=STATUS)
    started_at   = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    rows_processed = models.IntegerField(default=0)
    error_log    = models.TextField(blank=True)

    def duration_seconds(self):
        if self.completed_at:
            return (self.completed_at - self.started_at).seconds
        return None
