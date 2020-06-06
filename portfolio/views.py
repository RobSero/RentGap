# pylint: disable=no-member
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound, NotAuthenticated
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

User = get_user_model()
from orders.models import Order
from orders.serializers import OrderSerializer, PopulatedOrderSerializer
from orders.value_changes import value_change

# ---- Compare Value Change --------




class Portfolio(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def get_user(self,pk):
    try: 
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise NotFound()
    
  def get_active_orders(self, user_id):
    # get all orders that have the user_id of parameter
      return Order.objects.filter(user=user_id).filter(active=True)

      
  
  #  ------------------- Send over portfolio data: orders/properties ---------------
  #  GET request to /portfolio/<int:id> userId required
  #  No body required
  #  Valid Token required
  
  def get(self,req,pk):
    # Check if authenticated
    # get user
    user = self.get_user(pk=pk)
    print(user)
    # get orders
    orderList = self.get_active_orders(user_id=user.id)
    
    # serialize and populate
    order_json = PopulatedOrderSerializer(orderList, many=True)
    for order in order_json.data:
      order['value_change'] = value_change(previous=order['value_at_time'], current=order['property_detail']['current_valuation'])  
 
    return Response(order_json.data, status=status.HTTP_200_OK)
    # compare price differences and add json property: Percentage change
    # send json
    