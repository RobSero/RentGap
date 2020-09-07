from django.test import TestCase
from properties.models import Property
# Create your tests here.
property_to_update = Property.objects.get(pk=1)


class CheckValueChanging(TestCase):
  def test_value_type(self):
    self.assertIsInstance(property_to_update.current_valuation, int)
    
  def test_update_value(self):
    example_value_increase = 2500
    new_prop_value = property_to_update.current_valuation + example_value_increase
    self.assertNotEqual(new_prop_value, property_to_update.current_valuation)
    