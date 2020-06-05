from django.urls import path
from .views import NewOrder

urlpatterns = [
    path('new/<int:pk>/', NewOrder.as_view())
]
