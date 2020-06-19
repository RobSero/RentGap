from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.views import APIView
from .models import NewsArticle
# Create your views here.

class NewsUploads(APIView):
  
  #post request - take a body of news articles in array
  #  Deletes all current articles from database
  # save all new articles using model serializer
  def post(self, req):
    return Response({'message': 'Uploaded news articles'})
  
  






class ShowNews(APIView):
  
  #get request - valid token
  #gets all articles
  # serializes and sends to frontend
  def get(self,req):
    return Response({'message': 'Uploaded news articles'})