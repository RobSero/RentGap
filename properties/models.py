from django.db import models
# pylint: disable=no-member
# Create your models here.
class Property(models.Model):
    title = models.CharField(max_length=50)
    postcode = models.CharField(max_length=7)
    address = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    prop_type = models.CharField(max_length=20)
    construction_date = models.CharField(max_length=20)
    area = models.FloatField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    finish = models.CharField(max_length=20)
    outdoor_space = models.CharField(max_length=20)
    parking = models.IntegerField()
    current_valuation = models.IntegerField(blank=True, null=True)
    margin = models.IntegerField(blank=True, null=True)
    rental_value = models.FloatField(blank=True, null=True)
    gross_yield = models.FloatField(blank=True, null=True)
    image_main = models.CharField(max_length=200, blank=True, null=True)
    image_one = models.CharField(max_length=200, blank=True, null=True)
    image_two = models.CharField(max_length=200, blank=True, null=True)
    image_three = models.CharField(max_length=200, blank=True, null=True)
    image_four = models.CharField(max_length=200, blank=True, null=True)
    image_five = models.CharField(max_length=200, blank=True, null=True)
    image_six = models.CharField(max_length=200, blank=True, null=True)
    image_seven = models.CharField(max_length=200, blank=True, null=True)
    image_eight = models.CharField(max_length=200, blank=True, null=True)
    image_nine = models.CharField(max_length=200, blank=True, null=True)
    image_floorplan = models.CharField(max_length=200, blank=True, null=True)
    growth_2015 = models.FloatField(blank=True, null=True)
    growth_2016 = models.FloatField(blank=True, null=True)
    growth_2017 = models.FloatField(blank=True, null=True)
    growth_2018 = models.FloatField(blank=True, null=True)
    growth_2019 = models.FloatField(blank=True, null=True)
    growth_2020 = models.FloatField(blank=True, null=True)
    
    
    def __str__(self):
        return f'property {self.id} - {self.title}'
    
    
