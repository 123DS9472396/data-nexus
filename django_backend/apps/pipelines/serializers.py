from rest_framework import serializers
from .models import Pipeline, PipelineRun

class PipelineRunSerializer(serializers.ModelSerializer):
    duration_seconds = serializers.SerializerMethodField()

    class Meta:
        model  = PipelineRun
        fields = "__all__"

    def get_duration_seconds(self, obj):
        return obj.duration_seconds()

class PipelineSerializer(serializers.ModelSerializer):
    runs  = PipelineRunSerializer(many=True, read_only=True)
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model  = Pipeline
        fields = "__all__"

    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        return super().create(validated_data)
