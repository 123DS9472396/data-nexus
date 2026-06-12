import pymongo
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Integration

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def connect_integration(request):
    provider = request.data.get('provider')
    credentials = request.data.get('credentials')
    
    if provider == 'mongodb':
        try:
            uri = credentials.get('uri')
            client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
            client.admin.command('ping')
            
            # Save or update integration
            integration, created = Integration.objects.update_or_create(
                provider='mongodb',
                defaults={
                    'name': 'MongoDB Atlas',
                    'credentials': {'uri': uri}, # In prod, encrypt this!
                    'status': 'Connected'
                }
            )
            return Response({"status": "success", "message": "Successfully connected to MongoDB Atlas!"})
        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=400)
            
    return Response({"status": "error", "message": "Unsupported provider"}, status=400)
