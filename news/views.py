# pylint: disable=no-member
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.views import APIView
from rest_framework import status
from .models import NewsArticle
from .serializers import NewsSerializer
import json
# Create your views here.

class NewsUploads(APIView):
  
  def post(self, req):
    NewsArticle.objects.all().delete()
    article_list = []
    for article in req.data['articles']:
        
        new_article = {
          'title' : article['title'],
          'description':  article['description'],
          'published_at' : article['publishedAt'],
          'url_link' : article['url'],
          'image': article['urlToImage'],
          'source' : article['source']['name'],
          'author' : article['author']
        }
        article_list.append(new_article)
        
        new_article_serialized = NewsSerializer(data=new_article)
        if new_article_serialized.is_valid():
          print('article saved')
          new_article_serialized.save()
       
    return Response(new_article_serialized.errors)
  
  






class ShowNews(APIView):
  
  #get request - valid token
  #gets all articles
  # serializes and sends to frontend
  def get(self,req):
    try:
      all_articles = NewsArticle.objects.all()
      serialized_articles = NewsSerializer(all_articles, many=True)
      return Response(serialized_articles.data, status=status.HTTP_200_OK)
    except NewsArticle.DoesNotExist:
      raise NotFound()