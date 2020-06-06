from django.urls import path
from .views import CommentHandler
urlpatterns = [
    path('properties/<int:pk>/', CommentHandler.as_view())
]
