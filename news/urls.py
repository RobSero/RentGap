from django.urls import path
from .views import NewsArticle, NewsUploads


urlpatterns = [
    path('upload/', NewsUploads.as_view()),
    path('articles/', NewsUploads.as_view()),
]
