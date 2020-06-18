# pylint: disable=no-member
from .property_param_data_many import all_property_params, all_prop_growth_params
from properties.models import Property
from properties.serializers import PropertySerializer
from rest_framework.exceptions import NotFound
import random
import requests
from time import sleep


def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()


def update_value_rent_data_artificial():
    properties = [3,7,10,13,17]
    for prop in properties:
      # Randomly Alter property value and rentals
      property_to_update = get_property(pk=prop)
      property_to_update.current_valuation = random.randint(property_to_update.current_valuation * 0.95, property_to_update.current_valuation * 1.05)
      property_to_update.rental_value = random.randint(property_to_update.rental_value * 0.95, property_to_update.rental_value * 1.05)
      property_to_update.margin = random.randint(property_to_update.margin * 0.95, property_to_update.margin * 1.05)
      property_to_update.save()


def update_value_rent_data():
    url_path_value = 'https://api.propertydata.co.uk/valuation-sale'
    url_path_rent = 'https://api.propertydata.co.uk/valuation-rent'
    
    for property_params in all_property_params:
      # Make HTTP request to third party API
      http_response_value = requests.get(url_path_value, params=property_params)
      sleep(3)
      http_response_rent = requests.get(url_path_rent, params=property_params)
      property_value = http_response_value.json()
      property_rent = http_response_rent.json()
    #Get property and update with new values
      property_to_update = get_property(pk=property_params['database_ref'])
      property_to_update.current_valuation = property_value['result']['estimate']
      property_to_update.margin = property_value['result']['margin']
      property_to_update.rental_value = property_rent['result']['estimate']
      property_to_update.save()
      sleep(5)
      
  
def update_test():
    prop_to_update = Property.objects.get(pk=1)
    prop_to_update.current_valuation += 25000
    print('UPDATED PROPERTY!')
    prop_to_update.save()
  



def update_growth_data():
    url_path_growth = 'https://api.propertydata.co.uk/growth'
    for property_params in all_prop_growth_params:
      # Make HTTP request to third party API
      http_response_growth = requests.get(url_path_growth, params=property_params)
      sleep(3)
      property_growth = http_response_growth.json()
      print(property_growth)
      
      #Get property and update with new values
      growth_2015 = property_growth['data'][0][1]
      growth_2016 = property_growth['data'][1][1]
      growth_2017 = property_growth['data'][2][1]
      growth_2018 = property_growth['data'][3][1]
      growth_2019 = property_growth['data'][4][1]
      growth_2020 = property_growth['data'][5][1]
      property_to_update = get_property(pk=property_params['database_ref'])
      property_to_update.growth_2015 = growth_2015
      property_to_update.growth_2016 = growth_2016
      property_to_update.growth_2017 = growth_2017
      property_to_update.growth_2018 = growth_2018
      property_to_update.growth_2019 = growth_2019
      property_to_update.growth_2020 = growth_2020

      property_to_update.save()
      sleep(5)
  