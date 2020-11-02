from django.test import TestCase
from .models import Property


class TestPropertyModelQueries(TestCase):
  def setUp(self):
    new_property = Property.objects.create(title='new flat west london', postcode='SE27', address='55 GreenLane', latitude=44.1, longitude=-0.23, prop_type='Flat', construction_date='1900-1950',area=4500, region='Sout-East',bedrooms=3,bathrooms=5,finish='High',outdoor_space='Garden Balcony', parking=2)
  
  
  def test_read_property_data(self):
    property_one = Property.objects.get(pk=1)
    self.assertTrue(property_one)
    self.assertEqual(property_one.postcode, 'SE27')
    
    
  def test_update_property(self):
    property_to_update = Property.objects.get(pk=2)
    self.assertTrue(property_to_update)
    property_to_update.description = 'Nice new description here'
    property_to_update.save()
    new_property = Property.objects.get(pk=2)
    self.assertEqual(new_property.description, 'Nice new description here')


    