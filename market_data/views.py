from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from properties.models import Property
import request

# Create your views here.
class ValuationData(APIView):
  
  def get(self, req):
    return Response({'message': 'GETTING THIRD PARTY API DATA'}, status=status.HTTP_200_OK)