# pylint: disable=no-member
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from .serializers import CommentSerializer

User = get_user_model()
from properties.models import Property
from .models import Comment

# Create your views here.
class CommentHandler(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def get_user(self,pk):
    try:
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise NotFound()
    
  def get_property(self,pk):
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()
  
  
  #  -------------------- Create a Comment  -------------------------
  # POST request to '/comment/property/<int:pk>/'  pk=propertyId
  # body required = {
  #  'content' : String
  # }
  #  Valid Token Required
  
  def post(self,req,pk):
    # get user
    owner = self.get_user(req.user.id) 
    
    
    # get property
    property_to_comment = self.get_property(pk)
    print(property_to_comment)
    # attach body and owner to comment
    # new_comment = CommentSerializer(new_comment)   
    # serialize and send
    return Response({'test': 'yo'}, status=status.HTTP_200_OK)