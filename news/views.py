# pylint: disable=no-member
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.views import APIView
from rest_framework import status
from .models import NewsArticle
from .serializers import NewsSerializer
import json



# THIS UPDATES THE NEWS ARTICLES AND REQUIRES A POST REQUEST
#  Body required - an array of news articles:
#           {
  #         'title' : String
  #         'description': String
  #         'published_at' : String
  #         'url_link' : String
  #         'image': String
  #         'source' : String
  #         'author' : String
#           }
# No valid token required

class NewsUploads(APIView):
  
  def post(self, req):
    # Clear all existing news articles from database
    NewsArticle.objects.all().delete()
    article_list = []
    # loop through each json article
    for article in req.data['articles']:
        # create dictionary of article
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
        #  serialize and validate
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