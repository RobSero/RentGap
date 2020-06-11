from django.urls import path
from .views import OneProperty, PropertyList, FeaturedPropertyList

urlpatterns = [
    path('', PropertyList.as_view()),
    path('featured/', FeaturedPropertyList.as_view()),
    path('<int:pk>/', OneProperty.as_view())
]
