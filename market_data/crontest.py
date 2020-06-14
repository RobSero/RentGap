# pylint: disable=no-member
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound
from .property_param_data_many import all_property_params, all_prop_growth_params

from properties.models import Property
from properties.serializers import PropertySerializer
import requests
from time import sleep



def update_test():
  prop_to_update = Property.objects.get(pk=1)
  prop_to_update.current_valuation += 25000
  print('UPDATED PROPERTY!')
  prop_to_update.save()

