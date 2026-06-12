import os
import django
import random
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.users.models import User
from apps.pipelines.models import Pipeline, PipelineRun
from apps.datasets.models import Dataset

admin_user = User.objects.filter(username='admin').first()

if not admin_user:
    print("Admin user not found. Run createsuperuser first.")
    exit(1)

# Clear existing
Pipeline.objects.all().delete()
Dataset.objects.all().delete()

# Create Datasets
datasets = [
    ("NYC Taxi Trips 2026", "parquet", 15400000, 250.5),
    ("Weather Data Streams", "api", 0, 0),
    ("Salesforce Leads", "json", 50000, 15.2),
    ("Financial Logs", "csv", 1200000, 85.0),
    ("Marketing Conversions", "csv", 350000, 22.1)
]

for name, fmt, rows, size in datasets:
    Dataset.objects.create(
        name=name,
        source_type=fmt,
        row_count=rows,
        size_mb=size,
        owner=admin_user,
        last_refreshed=timezone.now() - timedelta(hours=random.randint(1, 24))
    )

# Create Pipelines
pipes = [
    ("Snowflake Daily Sync", "PostgreSQL", "Snowflake", "active"),
    ("WeatherFlow Real-time", "API", "ClickHouse", "active"),
    ("Legacy CRM Migration", "Oracle", "PostgreSQL", "failed"),
    ("User Events Streaming", "Kafka", "MongoDB", "running"),
    ("Nightly Aggregations", "ClickHouse", "S3", "paused")
]

for name, src, dst, status in pipes:
    p = Pipeline.objects.create(
        name=name,
        source=src,
        destination=dst,
        status=status,
        owner=admin_user
    )
    # Create some historical runs
    if status != "paused":
        PipelineRun.objects.create(
            pipeline=p,
            status="success" if status != "failed" else "failed",
            rows_processed=random.randint(1000, 500000),
            started_at=timezone.now() - timedelta(hours=2),
            completed_at=timezone.now() - timedelta(hours=1, minutes=50)
        )

print("Database seeded successfully with realistic project data!")
