from django.urls import path
from .views import ShowNews, NewsUploads


urlpatterns = [
    path('/upload', NewsUploads.as_view()),
    path('/articles', ShowNews.as_view()),
]
