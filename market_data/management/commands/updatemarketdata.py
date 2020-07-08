from django.core.management.base import BaseCommand
from market_data.property_param_data_many import all_prop_growth_params, all_property_params
from properties.models import Property
from rest_framework.exceptions import NotFound
import random
import requests
from time import sleep

def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()
    
# returns a value roughly between 98%-102% of argument
def random_value_changer(value):
  return random.randint(int(value * 0.98), int(value * 1.02))



class Command(BaseCommand):
  help = 'Will update market values based on third party API results'
  
  def handle(self, *args, **options):
    url_path_value = 'https://api.propertydata.co.uk/valuation-sale'
    url_path_rent = 'https://api.propertydata.co.uk/valuation-rent'
    # loop through each property and send a request to property data to collect latest values and rent
    for property_params in all_property_params:
      # Make HTTP request to third party API - Get latest property value
      http_response_value = requests.get(url_path_value, params=property_params)
      # PropertyData requires 3-5 second delay between requests or they will decline
      sleep(3)
      # Make HTTP request to third party API - Get latest property rental
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