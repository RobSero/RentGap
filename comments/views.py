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


def get_user(pk):
    try:
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise NotFound()
    
def get_property(pk):
    try:
      return Property.objects.get(pk=pk)
    except Property.DoesNotExist:
      raise NotFound()
    
def get_comment(pk):
    try:
      return Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
      raise NotFound()



class CommentHandler(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  #  -------------------- Create a Comment  -------------------------
  # POST request to '/comment/properties/<int:pk>/'  pk=propertyId
  # body required = {
  #  'content' : String
  # }
  #  Valid Token Required
  def post(self,req,pk):
    # get user
    owner = get_user(req.user.id) 
    req.data['owner'] = owner.id
    
    # get property
    property_to_comment = get_property(pk)
    req.data['property_detail'] = property_to_comment.id
    
     # serialize and send
    new_comment = CommentSerializer(data=req.data)   
    if new_comment.is_valid():
      new_comment.save()
      return Response(new_comment.data, status=status.HTTP_200_OK)
   
    return Response(new_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  


class CommentEdit(APIView):
  permission_classes = (IsAuthenticated,)
  #  checks if user is the owner of the comment, will raise error if not
  def is_owner(self, comment, user):
    if comment.owner.id == user.id:
      return 
    raise PermissionDenied()
  
  #  -------------------- Delete a Comment  -------------------------
  # DELETE request to '/comment/<int:pk>/'  pk=commentId
  # no body required
  # Valid Token Required - Owner of comment or admin
  def delete(self,req,pk):
    # get user
    user = get_user(req.user.id) 
    # Get Comment
    comment_to_delete = get_comment(pk)
    self.is_owner(comment=comment_to_delete, user=user)
    comment_to_delete.delete()
    return Response({'message': 'Deleted Successfully'}, status=status.HTTP_200_OK)
  
  
    #  -------------------- Edit a Comment  -------------------------
  # PUT request to '/comment/<int:pk>/'  pk=commentId
  # body required = { "content" : String }
  # Valid Token Required - Owner of comment or admin
  def put(self,req,pk):
      # get user
    user = get_user(req.user.id) 
    print(user)
    # Get Comment
    comment_to_edit = get_comment(pk)
    self.is_owner(comment=comment_to_edit, user=user)
    # set owner and property to request object
    req.data['owner'] = req.user.id
    req.data['property_detail'] = comment_to_edit.property_detail.id
    # serialize and validate
    updated_comment = CommentSerializer(comment_to_edit, data=req.data)
    if updated_comment.is_valid():
        updated_comment.save()
        return Response({'message': 'Edit Successfully'}, status=status.HTTP_200_OK)
    return Response(updated_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
   