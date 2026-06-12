import pymongo
import psycopg2
import boto3
import requests
import snowflake.connector
from kafka import KafkaConsumer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Integration

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def connect_integration(request):
    provider = request.data.get('provider')
    credentials = request.data.get('credentials')
    
    try:
        if provider == 'mongodb':
            uri = credentials.get('uri')
            client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
            client.admin.command('ping')
            name = 'MongoDB Atlas'

        elif provider == 'postgres':
            uri = credentials.get('uri')
            conn = psycopg2.connect(uri, connect_timeout=5)
            conn.close()
            name = 'PostgreSQL'

        elif provider == 'aws':
            access_key = credentials.get('access_key')
            secret_key = credentials.get('secret_key')
            s3 = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key)
            s3.list_buckets()
            name = 'AWS S3'

        elif provider == 'snowflake':
            account = credentials.get('account')
            user = credentials.get('user')
            password = credentials.get('password')
            conn = snowflake.connector.connect(user=user, password=password, account=account)
            conn.close()
            name = 'Snowflake'

        elif provider == 'kafka':
            bootstrap = credentials.get('bootstrap')
            api_key = credentials.get('api_key')
            api_secret = credentials.get('api_secret')
            consumer = KafkaConsumer(
                bootstrap_servers=[bootstrap],
                security_protocol="SASL_SSL",
                sasl_mechanism="PLAIN",
                sasl_plain_username=api_key,
                sasl_plain_password=api_secret,
                api_version=(0, 10, 0),
                request_timeout_ms=5000
            )
            consumer.close()
            name = 'Apache Kafka'

        elif provider == 'salesforce':
            client_id = credentials.get('client_id')
            client_secret = credentials.get('client_secret')
            # Mocking salesforce OAuth ping or just storing if simple requests
            # For a real implementation, we'd hit https://login.salesforce.com/services/oauth2/token
            res = requests.post("https://login.salesforce.com/services/oauth2/token", data={
                'grant_type': 'client_credentials',
                'client_id': client_id,
                'client_secret': client_secret
            }, timeout=5)
            if res.status_code == 400 and 'invalid_client' in res.text:
                raise Exception("Invalid Salesforce Credentials")
            name = 'Salesforce'

        else:
            return Response({"status": "error", "message": "Unsupported provider"}, status=400)

        # Save or update integration
        Integration.objects.update_or_create(
            provider=provider,
            defaults={
                'name': name,
                'credentials': credentials, # In prod, encrypt this!
                'status': 'Connected'
            }
        )
        return Response({"status": "success", "message": f"Successfully connected to {name}!"})

    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)
