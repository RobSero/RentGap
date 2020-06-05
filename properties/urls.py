from django.urls import path
from .views import OneProperty, PropertyList

urlpatterns = [
    path('', PropertyList.as_view()),
    path('<int:pk>/', OneProperty.as_view())
]
