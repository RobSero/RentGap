# pylint: disable=no-member
from .property_param_data_many import all_property_params, all_prop_growth_params
from properties.models import Property
from properties.serializers import PropertySerializer
from rest_framework.exceptions import NotFound
import requests
from time import sleep



def update_test():
  prop_to_update = Property.objects.get(pk=1)
  prop_to_update.current_valuation += 25000
  print('UPDATED PROPERTY!')
  prop_to_update.save()


def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()




def update_growth_data():
    url_path_growth = 'https://api.propertydata.co.uk/growth'
    url_path_yield = 'https://api.propertydata.co.uk/yields'
    for property_params in all_prop_growth_params:
      # Make HTTP request to third party API
      http_response_growth = requests.get(url_path_growth, params=property_params)
      sleep(3)
      http_response_yield = requests.get(url_path_yield, params=property_params)
      property_growth = http_response_growth.json()
      property_yield = http_response_yield.json()
      print(property_growth)
      print(property_yield)
      yield_string = property_yield['data']['long_let']['gross_yield']
      yield_float = float(yield_string.replace('%',''))
      
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
      property_to_update.gross_yield = yield_float
      property_to_update.save()
      sleep(5)
  