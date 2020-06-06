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
    


class SimplePropertySerializer(serializers.ModelSerializer):
  class Meta:
        model = Property
        fields = (
          'id',
          'title',
          'address',
          'prop_type',
          'area',
          'region',
          'bedrooms',
          'bathrooms',
          'outdoor_space',
          'current_valuation',
          'rental_value',
          'image_main'
        )