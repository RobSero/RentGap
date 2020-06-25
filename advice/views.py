# pylint: disable=no-member
from django.shortcuts import render
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework import status


# retrieve all articles
def get_article(pk):
  try:
    return Article.objects.get(pk=pk)
  except Article.DoesNotExist:
    raise NotFound()

class ArticleIndex(APIView):
  # RETRIEVE ALL ARTICLES 
  # GET request,
  # No body or token required
  def get(self,req):
    articles = Article.objects.all()
    serialized_articles = ArticleSerializer(articles,many=True)
    return Response(serialized_articles.data, status=status.HTTP_200_OK )
  
  
  
class OneArticle(APIView):
  # RETRIEVE ONE ARTICLE
  # GET request,
  # No body or token required
  def get(self,req,pk):
    article = get_article(pk)
    serialized_article = ArticleSerializer(article)
    return Response(serialized_article.data, status=status.HTTP_200_OK )