# pylint: disable=no-member
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound
from .property_param_data_many import all_property_params, all_prop_growth_params
import random
from properties.models import Property
from properties.serializers import PropertySerializer
import requests
from time import sleep

def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()


#  THIS WILL HANDLE CONSUMING VALUE AND RENTAL VALUE DATA FROM 'PROPERTY DATA' THIRD PARTY API
#  WARNING - THIS IS FOR TESTING PURPOSE
class ValuationDataOne(APIView):
  
  def get(self, req, pk):
    # url_path_value = 'https://api.propertydata.co.uk/valuation-sale'
    # url_path_rent = 'https://api.propertydata.co.uk/valuation-rent'
    # payload_property_one = {
    #   'key': '', 
    #   'postcode': 'L14EA',
    #   'property_type': 'flat',
    #   'construction_date': '2000_onwards',
    #   'internal_area' : 300,
    #   'bedrooms': 1, 
    #   'bathrooms' : 1,
    #   'finish_quality' : 'very_high',
    #   'outdoor_space' : 'balcony_terrace',
    #   'off_street_parking' : 0
    #   }
    # # Make HTTP request to third party API
    # http_response_value = requests.get(url_path_value, params=payload_property_one)
    # sleep(3)
    # http_response_rent = requests.get(url_path_rent, params=payload_property_one)
    # property_value = http_response_value.json()
    # property_rent = http_response_rent.json()
    # print(property_rent)
    # #Get property and update with new values
    # property_to_update = get_property(pk)
    # property_to_update.current_valuation = property_value['result']['estimate']
    # property_to_update.margin = property_value['result']['margin']
    # property_to_update.rental_value = property_rent['result']['estimate']
    # print(property_to_update)
    # property_to_update.save()
    return Response({'message': 'updated'}, status=status.HTTP_200_OK)
  


#  THIS WILL HANDLE CONSUMING GROWTH AND YIELD DATA FROM 'PROPERTY DATA' THIRD PARTY API
#  WARNING - THIS IS FOR TESTING PURPOSE
class GrowthDataOne(APIView):
  
  def get_property(self): 
    try:
      return Property.objects.get(pk=1)
    except Property.DoesNotExist:
      raise NotFound()
  
  
  # def get(self, req, pk):
  #   url_path_growth = 'https://api.propertydata.co.uk/growth'
  #   url_path_yield = 'https://api.propertydata.co.uk/yields'
  #   payload_property_one = {
  #     'key': '', 
  #     'postcode': 'L14EA',
  #     'bedrooms' : 1
  #     }
  #   # Make HTTP request to third party API
  #   http_response_growth = requests.get(url_path_growth, params=payload_property_one)
  #   sleep(3)
  #   http_response_yield = requests.get(url_path_yield, params=payload_property_one)
  #   property_growth = http_response_growth.json()
  #   property_yield = http_response_yield.json()
  #   yield_string = property_yield['data']['long_let']['gross_yield']
  #   yield_float = float(yield_string.replace('%',''))
    
  #   #Get property and update with new values
  #   growth_2015 = property_growth['data'][0][1]
  #   growth_2016 = property_growth['data'][1][1]
  #   growth_2017 = property_growth['data'][2][1]
  #   growth_2018 = property_growth['data'][3][1]
  #   growth_2019 = property_growth['data'][4][1]
  #   growth_2020 = property_growth['data'][5][1]
  #   property_to_update = get_property(pk)
  #   property_to_update.growth_2015 = growth_2015
  #   property_to_update.growth_2016 = growth_2016
  #   property_to_update.growth_2017 = growth_2017
  #   property_to_update.growth_2018 = growth_2018
  #   property_to_update.growth_2019 = growth_2019
  #   property_to_update.growth_2020 = growth_2020
  #   property_to_update.gross_yield = yield_float
  #   property_to_update.save()
  #   return Response({'message': 'GROWTH updated'}, status=status.HTTP_200_OK)


  
  #  THIS WILL HANDLE CONSUMING GROWTH AND YIELD DATA FROM 'PROPERTY DATA' THIRD PARTY API
  #  WARNING - THIS IS FOR TESTING PURPOSE
class ValuationDataAll(APIView):
    
  def get_property(self,pk): 
    try:
      return Property.objects.get(pk=1)
    except Property.DoesNotExist:
      raise NotFound()
    
    
    # GET request to base_url/marketdata/growth/all
    # no body or token required
    
  # def get(self, req):
  #   url_path_value = 'https://api.propertydata.co.uk/valuation-sale'
  #   url_path_rent = 'https://api.propertydata.co.uk/valuation-rent'
    
  #   for property_params in all_property_params:
  #     # Make HTTP request to third party API
  #     http_response_value = requests.get(url_path_value, params=property_params)
  #     sleep(3)
  #     http_response_rent = requests.get(url_path_rent, params=property_params)
  #     property_value = http_response_value.json()
  #     property_rent = http_response_rent.json()
  #   #Get property and update with new values
  #     property_to_update = get_property(pk=property_params['database_ref'])
  #     property_to_update.current_valuation = property_value['result']['estimate']
  #     property_to_update.margin = property_value['result']['margin']
  #     property_to_update.rental_value = property_rent['result']['estimate']
  #     property_to_update.save()
  #     sleep(5)
      
  #   return Response({'message': 'updated'}, status=status.HTTP_200_OK)
  
  
  
  
  # THIS WILL HANDLE THE UPDATES TO ALL PROPERTIES IN THE DATABASE TO REFLECT REAL DATA FROM 'PROPERTYDATA' THIRD PARTY API
  # SEE CRON_FUNCTIONS FOR THE LIVE UPDATING FUNCTIONS
  # THIS CLASS HANDLES UPDATING THE DATA IF A HTTP REQUEST IS SENT TO IT - FOR TESTING PURPOSES ONLY
  
  
class GrowthDataAll(APIView):
    
 
  
  def get_property(self): 
    try:
      return Property.objects.get(pk=1)
    except Property.DoesNotExist:
      raise NotFound()
    
    
   #  GET request to base_url/marketdata/value/all
  #  no body or token required
  
  # def get(self, req):
  #   url_path_growth = 'https://api.propertydata.co.uk/growth'
  #   url_path_yield = 'https://api.propertydata.co.uk/yields'
  #   for property_params in all_prop_growth_params:
  #     # Make HTTP request to third party API
  #     http_response_growth = requests.get(url_path_growth, params=property_params)
  #     sleep(3)
  #     http_response_yield = requests.get(url_path_yield, params=property_params)
  #     property_growth = http_response_growth.json()
  #     property_yield = http_response_yield.json()
  #     print(property_growth)
  #     print(property_yield)
  #     yield_string = property_yield['data']['long_let']['gross_yield']
  #     yield_float = float(yield_string.replace('%',''))
      
  #     #Get property and update with new values
  #     growth_2015 = property_growth['data'][0][1]
  #     growth_2016 = property_growth['data'][1][1]
  #     growth_2017 = property_growth['data'][2][1]
  #     growth_2018 = property_growth['data'][3][1]
  #     growth_2019 = property_growth['data'][4][1]
  #     growth_2020 = property_growth['data'][5][1]
  #     property_to_update = get_property(pk=property_params['database_ref'])
  #     property_to_update.growth_2015 = growth_2015
  #     property_to_update.growth_2016 = growth_2016
  #     property_to_update.growth_2017 = growth_2017
  #     property_to_update.growth_2018 = growth_2018
  #     property_to_update.growth_2019 = growth_2019
  #     property_to_update.growth_2020 = growth_2020
  #     property_to_update.gross_yield = yield_float
  #     property_to_update.save()
  #     sleep(5)
  #   return Response({'message': 'GROWTH updated'}, status=status.HTTP_200_OK)
  
  
  
  
