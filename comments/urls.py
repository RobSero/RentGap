from django.urls import path
from .views import CommentHandler, CommentEdit


urlpatterns = [
    path('properties/<int:pk>/', CommentHandler.as_view()),
    path('<int:pk>/', CommentEdit.as_view())
]
