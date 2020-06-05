# pylint: disable=no-member, no-self-use
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from .models import Order
from .serializers import OrderSerializer
from jwt_auth.serializers import UserSerializer
from properties.models import Property
User = get_user_model()

# Create your views here.
def get_order(pk):
    try:
      return Order.objects.get(pk)
    except Order.DoesNotExist:
      raise NotFound()
    
def get_user(pk):
    try:
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise NotFound()
    
  
def get_property(pk):
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()
    

def is_order_owner(order, user):
    if order.user_id != user.id:
      print('Incorrect User!')
      raise PermissionDenied()
      


  # ------------------------------  CREATE NEW ORDER -------------------------------
class NewOrder(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def post(self,req,pk):
    
    # get user ID
    userId = req.user.id
    user = get_user(userId)
    req.data['user_id'] = req.user.id
    # get property
    property_to_invest = get_property(pk)
    req.data['property_id'] = property_to_invest.id
    # Compare property value with investment amount
    req.data['value_at_time'] = property_to_invest.current_valuation
     # set ownership field to a float % value
    req.data['ownership']  = req.data['investment'] / req.data['value_at_time']
    new_order = OrderSerializer(data=req.data)
    if new_order.is_valid():
      user.money = user.money - req.data['investment']
      user.save()
      new_order.save()
      return Response(req.data, status=status.HTTP_201_CREATED)
    # create order
    # property_to_invest.save()
    # return order details
    return Response(new_order.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
  
    


  # ------------------------------  DELETE ORDER -------------------------------
class ClearOrder(APIView):
  
  permission_classes = (IsAuthenticated,)

  def delete(self,req,pk):
     # get user ID
    user = get_user(req.user.id)
    #get Order
    order_to_clear = get_order(pk)
    is_order_owner(order_to_clear, user)
      
    # get property
    property_to_invest = get_property(order_to_clear.property_id)
    
    
    # calculate capital to return to user ownership*current_valuation
    #delete