from rest_framework import serializers
from .models import Comment
from jwt_auth.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
  
  property_detail = serializers
  
  
  class Meta:
    model = Comment
    fields = '__all__'
    
class PopulatedCommentSerializer(CommentSerializer):
      
      owner = UserSerializer()