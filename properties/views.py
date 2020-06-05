# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import PropertySerializer

# import requests
from .models import Property





#  --------------------------- INDEX PROPERTIES CONTROLLERS ---------------------------------

class PropertyList(APIView):
  
    permission_classes = (IsAuthenticated,)
    
    def get_properties(self):
        try:
            return Property.objects.all()
        except Property.DoesNotExist:
            raise NotFound()
        

    #   -------- DISPLAY PROPERTY INDEX -----------
    def get(self,req):
        properties_list = self.get_properties()
        print(f'PROPERTY LIST RIGHT HERE: {properties_list}')
        properties_json = PropertySerializer(properties_list, many=True)
        return Response(properties_json.data, status=status.HTTP_200_OK)






#  --------------------------- ONE PROPERTY CONTROLLERS ---------------------------------

class OneProperty(APIView):
    
    def get_property(self, pk):
        try:
            return Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise NotFound()
        
    
        #   -------- DISPLAY PROPERTY DATA -----------
    
    def get(self, req, pk):
        property_info = self.get_property(pk)
        property_json = PropertySerializer(property_info)
        return Response(property_json.data, status=status.HTTP_200_OK )
    
    # TEST HTTP REQUESTS
    # def post(self,req,pk):
        
    #         payload = {'key': 'ZPN3BFTUC4', 'bedrooms': 3, 'postcode': 'SE270RS'}
    #         httpReq = requests.get("https://api.propertydata.co.uk/yields", params=payload)
    #         print(f'THE URL SENT WITH PARAMS: {httpReq}')
    #         print(f'Value of Status Code: {httpReq.status_code}')
    #         print(f'Value of Json: {httpReq.json()}')
    #         print(f'Value of Text: {httpReq.text}')
    #         return Response(httpReq.json(), status=status.HTTP_200_OK)