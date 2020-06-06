from rest_framework import serializers
from .models import Order
from properties.serializers import PropertySerializer, SimplePropertySerializer

class OrderSerializer(serializers.ModelSerializer):
  
    class Meta:
      model = Order
      fields = '__all__'
      

class PopulatedOrderSerializer(OrderSerializer):
  property_detail = SimplePropertySerializer()