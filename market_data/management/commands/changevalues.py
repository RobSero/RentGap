from django.core.management.base import BaseCommand
from properties.models import Property
from rest_framework.exceptions import NotFound
import random

def get_property(pk): 
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()
    
# returns a value roughly between 98%-102% of argument
def random_value_changer(value):
  return random.randint(int(value * 0.995), int(value * 1.005))



class Command(BaseCommand):
  help = 'Will artificial adjust some property values at random every few hours'
  #  CRON FUNCTION - CHANGES SOME PROPERTIES RANDOMLY DURING TIMES WHEN PROPERTY VALUES ARE NOT CHANGING FOR LONG PERIODS
  #  THIS WILL VARY THE PROPERTY VALUES RANDOMLY BY A FEW PERCENT
  def handle(self, *args, **options):
    # Select properties to be randomized - list containing property ids
    properties = [1,3,7,8,10,13,15,17,19,22,25]
    # Loop through properties
    for property_id in properties:
      # Randomly alter property value and rentals
      property_to_update = get_property(pk=property_id)
      if property_to_update:
        property_to_update.current_valuation = random_value_changer(value=property_to_update.current_valuation) 
        property_to_update.rental_value = random_value_changer(value=property_to_update.rental_value) 
        property_to_update.margin = random_value_changer(value=property_to_update.margin) 
        property_to_update.save()