from django.urls import path
from .views import Portfolio

urlpatterns = [
    path('<int:pk>/', Portfolio.as_view() )
]
