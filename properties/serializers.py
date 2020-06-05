from rest_framework import serializers
from .models import Property
# from comments.serializers import CommentSerializer
# from comments.serializers import CommentSerializer

class PropertySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Property
        fields = '__all__'

# class PopulatedPropertySerializer(PropertySerializer):
#     comments = CommentSerializer(many=True)
#     # growth =  GrowthSerializer(many=True)
    