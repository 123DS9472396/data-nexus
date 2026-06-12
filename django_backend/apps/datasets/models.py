from django.db import models
from apps.users.models import User

class Dataset(models.Model):
    FORMATS = [("csv","CSV"),("parquet","Parquet"),("json","JSON"),("api","API")]
    name         = models.CharField(max_length=200)
    description  = models.TextField(blank=True)
    source_type  = models.CharField(max_length=20, choices=FORMATS, default="csv")
    row_count    = models.BigIntegerField(default=0)
    size_mb      = models.FloatField(default=0)
    last_refreshed = models.DateTimeField(null=True, blank=True)
    owner        = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
