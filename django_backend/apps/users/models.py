from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = [("admin", "Admin"), ("analyst", "Analyst"), ("viewer", "Viewer")]
    role       = models.CharField(max_length=20, choices=ROLES, default="analyst")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
