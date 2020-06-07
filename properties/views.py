# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import PropertySerializer, SimplePropertySerializer
from django.contrib.auth import get_user_model

# import requests
from .models import Property
from orders.models import Order
from orders.serializers import OrderSerializer
from orders.value_changes import value_change
User = get_user_model()




#  --------------------------- INDEX PROPERTIES CONTROLLERS ---------------------------------

class PropertyList(APIView):
  
    permission_classes = (IsAuthenticated,)
    
    
    
    def get_properties(self):
        try:
            return Property.objects.all()
        except Property.DoesNotExist:
            raise NotFound()
        

    #   -------- DISPLAY PROPERTY INDEX -----------
      # GET request to baseURL/property 
      # no body required - valid token required
    def get(self,req):
        properties_list = self.get_properties()
        print(f'PROPERTY LIST RIGHT HERE: {properties_list}')
        properties_json = SimplePropertySerializer(properties_list, many=True)
        return Response(properties_json.data, status=status.HTTP_200_OK)






#  --------------------------- ONE PROPERTY CONTROLLERS ---------------------------------

def get_active_order(user_id,property_id):
      return Order.objects.filter(user=user_id).filter(property_detail=property_id).filter(active=True)
   
    
def get_user(pk):
    try:
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise NotFound()


class OneProperty(APIView):
  
    permission_classes = (IsAuthenticated,)
    
    def get_property(self, pk):
        try:
            return Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise NotFound()
        
    
        #   -------- DISPLAY PROPERTY DATA -----------
      # GET request to baseURL/property/<int:pk> (property ID) 
      # no body required - valid token required
      
    def get(self, req, pk):
      # Get Property Data
        property_info = self.get_property(pk)
        property_json = PropertySerializer(property_info)
      # Get Order (if found)
        order = get_active_order(req.user.id, pk )
        
      # Send JSON data to client with or without order details if necessary
        if len(order) != 0:
          order_json = OrderSerializer(order[0])
          order_json.data['value_change'] = value_change(previous=order_json.data['value_at_time'], current=property_json.data['current_valuation'])  
          return Response({'property':property_json.data,
                         'order': order_json.data}
                        , status=status.HTTP_200_OK )
        
        return Response({'property':property_json.data,
                         'order': None}
                        , status=status.HTTP_200_OK )
        
       
      
        
    
    #   -------- ADD PROPERTY TO WATCHLIST -----------
      # PUT request to baseURL/property/<int:pk> (property ID) 
      # no body required - valid token required
      
    def put(self,req,pk):
      # get property
      single_property = self.get_property(pk)
      print(single_property)
      # get user
      user = get_user(req.user.id)
      print(user)
      # check if relationship exists
      if single_property.watchers.filter(pk=user.id).exists():
        single_property.watchers.remove(user)
        return Response({'message': 'REMOVED TO WATCHLIST'}, status=status.HTTP_201_CREATED)
      else:
        single_property.watchers.add(user)
        return Response({'message': 'ADDED TO WATCHLIST'}, status=status.HTTP_201_CREATED)
      