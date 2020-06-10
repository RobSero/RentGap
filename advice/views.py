# pylint: disable=no-member
from django.shortcuts import render
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework import status
# Create your views here.

def get_article(pk):
  try:
    return Article.objects.get(pk=pk)
  except Article.DoesNotExist:
    raise NotFound()

class ArticleIndex(APIView):
  
  def get(self,req):
    print('ARTICLES')
    articles = Article.objects.all()
    serialized_articles = ArticleSerializer(articles,many=True)
    return Response(serialized_articles.data, status=status.HTTP_200_OK )
  
  
class OneArticle(APIView):
  
  def get(self,req,pk):
    print('one ARTICLE')
    article = get_article(pk)
    serialized_article = ArticleSerializer(article)
    return Response(serialized_article.data, status=status.HTTP_200_OK )