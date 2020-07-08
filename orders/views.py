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
      return Order.objects.get(pk=pk)
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
    if order.user.id != user.id:
      print('Incorrect User!')
      raise PermissionDenied()
    print('SAME OWNER')

def order_exists(user_id,property_id):
  # filter by user, then filter out inactive orders, then filter by property id
    return Order.objects.filter(user=user_id).filter(active=True).filter(property_detail=property_id).exists()
    


  # ------------------------------  CREATE NEW ORDER -------------------------------
  # POST request to baseURL/new/<int:pk> <-- pk = property_Id
  # body required = {'investment': <int>}, valid token required
  
class NewOrder(APIView):
  # user must have valid auth token to proceed
  permission_classes = (IsAuthenticated,)
  
  def post(self,req,pk):
    
    # get user ID
    user_id = req.user.id
    user = get_user(pk=user_id)
    if user.money < (req.data['investment'] * 1.01):
      return Response({'message': 'Insufficient funds in account'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    req.data['user'] = req.user.id
    # get property
    property_to_invest = get_property(pk=pk)
    if order_exists(user_id=user_id,property_id=pk):
      return Response({'message': 'Already got an open order'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    req.data['property_detail'] = property_to_invest.id
    # Compare property value with investment amount
    req.data['value_at_time'] = property_to_invest.current_valuation
     # set ownership field to a float % value
    req.data['ownership']  = req.data['investment'] / req.data['value_at_time']
    # serialize and validate
    new_order = OrderSerializer(data=req.data)
    if new_order.is_valid():
      # deduct funds from user account
      user.money -= (req.data['investment'] * 1.01)
      # save user and new order
      user.save()
      new_order.save()
      return Response(req.data, status=status.HTTP_201_CREATED)
    return Response(new_order.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
  
    


  # ------------------------------  CLEAR ORDER -------------------------------
  # DELETE request to baseURL/clear/<int:pk> <-- pk = order_id
  # No body required, valid token required of order owner
  
  
class ClearOrder(APIView):
  
  permission_classes = (IsAuthenticated,)

  def delete(self,req,pk):
     # get user ID
    user = get_user(req.user.id)
    #get Order
    order_to_clear = get_order(pk)
    is_order_owner(order_to_clear, user)
    # get property
    invested_property = get_property(order_to_clear.property_detail.id)
    # calculate capital to return to user ownership*current_valuation
    investment_returned = invested_property.current_valuation * order_to_clear.ownership 

    # set status of order to inactive and refund user
    user.money += investment_returned - (investment_returned * 0.01)
    order_to_clear.active = False
    
    order_to_clear.save()
    user.save()
    return Response({'message': 'success!'}, status=status.HTTP_201_CREATED)
  
  
  
  
  # ------------------------------  EDIT ORDER -------------------------------
  # PUT request to baseURL/edit/<int:pk> <-- pk = order_id
  # body required = {'withdraw' : <int>}, valid token required of order owner

class EditOrder(APIView):
  
  permission_classes = (IsAuthenticated,)

  def put(self,req,pk):
    
     # get user ID
    user = get_user(req.user.id)
    #get Order
    order_to_update = get_order(pk)
    # Check if order is open?
    if order_to_update.active == False:
      raise PermissionDenied()
    
    is_order_owner(order_to_update, user)
    # get property
    invested_property = get_property(order_to_update.property_detail.id)
    # calculate investment change
    value_change_percent = (invested_property.current_valuation / order_to_update.value_at_time)  
    print(f'VALUE CHANGE PERCENT: {value_change_percent}')
    users_investment = (order_to_update.investment * value_change_percent) 
    # return capital to user
    if req.data['invest'] == '' and req.data['withdraw'] > 1:
        user.money += req.data['withdraw'] - (req.data['withdraw'] * 0.01)  
    # re-calculate their ownership / investment
        order_to_update.investment = users_investment - req.data['withdraw'] 
        order_to_update.ownership = order_to_update.investment / invested_property.current_valuation  
        order_to_update.value_at_time = invested_property.current_valuation
        order_to_update.save()
        user.save()
        return Response({'message': 'success!'}, status=status.HTTP_201_CREATED)
    # Or increase the investment amount and ownership
    elif req.data['withdraw'] == '' and req.data['invest'] > 1:
        if user.money < req.data['invest'] + (req.data['invest'] * 0.01):
          return Response({'message': 'Not enough funds in account'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        user.money -= req.data['invest'] + (req.data['invest'] * 0.01)
        order_to_update.investment = users_investment + req.data['invest']
        order_to_update.ownership = order_to_update.investment / invested_property.current_valuation  
        order_to_update.value_at_time = invested_property.current_valuation
        order_to_update.save()
        user.save()
        return Response({'message': 'success!'}, status=status.HTTP_201_CREATED)
    
    else:
      return Response({'message': 'provide a valid quantity'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)