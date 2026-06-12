from django.db import models

class Integration(models.Model):
    name = models.CharField(max_length=100, unique=True)
    provider = models.CharField(max_length=50) # e.g. 'mongodb', 'aws', 'snowflake'
    credentials = models.JSONField() # Securely store connection string/keys
    status = models.CharField(max_length=20, default='Disconnected')
    last_tested = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.provider})"
