from django.urls import path
from .views import ArticleIndex, OneArticle


urlpatterns = [
    path('', ArticleIndex.as_view()),
    path('/<int:pk>', OneArticle.as_view())
]
