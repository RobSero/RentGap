# pylint: disable=no-member
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound

from properties.models import Property
from properties.serializers import PropertySerializer
import requests
from time import sleep

def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()


# Create your views here.
class ValuationData(APIView):
  
  def get(self, req, pk):
    url_path_value = 'https://api.propertydata.co.uk/valuation-sale'
    url_path_rent = 'https://api.propertydata.co.uk/valuation-rent'
    payload_property_one = {
      'key': 'ZPN3BFTUC4', 
      'postcode': 'L14EA',
      'property_type': 'flat',
      'construction_date': '2000_onwards',
      'internal_area' : 300,
      'bedrooms': 1, 
      'bathrooms' : 1,
      'finish_quality' : 'very_high',
      'outdoor_space' : 'balcony_terrace',
      'off_street_parking' : 0
      }
    # Make HTTP request to third party API
    http_response_value = requests.get(url_path_value, params=payload_property_one)
    sleep(3)
    http_response_rent = requests.get(url_path_rent, params=payload_property_one)
    property_value = http_response_value.json()
    property_rent = http_response_rent.json()
    print(property_rent)
    #Get property and update with new values
    property_to_update = get_property(pk)
    property_to_update.current_valuation = property_value['result']['estimate']
    property_to_update.margin = property_value['result']['margin']
    
    property_to_update.rental_value = property_rent['result']['estimate']
    print(property_to_update)
    property_to_update.save()
    return Response({'message': 'updated'}, status=status.HTTP_200_OK)
  
  

class GrowthData(APIView):
  
  
  def get_property(self): 
    try:
      return Property.objects.get(pk=1)
    except Property.DoesNotExist:
      raise NotFound()
  
  
  def get(self, req, pk):
    url_path_growth = 'https://api.propertydata.co.uk/growth'
    url_path_yield = 'https://api.propertydata.co.uk/yields'
    payload_property_one = {
      'key': 'ZPN3BFTUC4', 
      'postcode': 'L14EA',
      'bedrooms' : 1
      }
    # Make HTTP request to third party API
    http_response_growth = requests.get(url_path_growth, params=payload_property_one)
    sleep(3)
    http_response_yield = requests.get(url_path_yield, params=payload_property_one)
    property_growth = http_response_growth.json()
    property_yield = http_response_yield.json()
    yield_string = property_yield['data']['long_let']['gross_yield']
    yield_float = float(yield_string.replace('%',''))
    
    #Get property and update with new values
    growth_2015 = property_growth['data'][0][1]
    growth_2016 = property_growth['data'][1][1]
    growth_2017 = property_growth['data'][2][1]
    growth_2018 = property_growth['data'][3][1]
    growth_2019 = property_growth['data'][4][1]
    growth_2020 = property_growth['data'][5][1]
    property_to_update = get_property(pk)
    property_to_update.growth_2015 = growth_2015
    property_to_update.growth_2016 = growth_2016
    property_to_update.growth_2017 = growth_2017
    property_to_update.growth_2018 = growth_2018
    property_to_update.growth_2019 = growth_2019
    property_to_update.growth_2020 = growth_2020
    property_to_update.gross_yield = yield_float
    property_to_update.save()
    return Response({'message': 'GROWTH updated'}, status=status.HTTP_200_OK)