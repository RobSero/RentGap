from django.urls import path
from .views import OrderHandling

urlpatterns = [
    path('', OrderHandling.as_view()),
]
