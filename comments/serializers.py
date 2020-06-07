from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  
  property_detail = serializers
  
  class Meta:
    model = Comment
    fields = '__all__'