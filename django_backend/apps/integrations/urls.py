from django.urls import path
from . import views

urlpatterns = [
    path('connect/', views.connect_integration, name='connect_integration'),
]
