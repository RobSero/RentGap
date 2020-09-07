from django.test import TestCase
from .models import Property
# Create your tests here.

property_one = Property.objects.get(pk=1)
# print(property_one)

class TestPropertyModelQueries(TestCase):
  def test_read_property_data(self):
    self.assertEqual(property_one.postcode, 'SE27')
    
  