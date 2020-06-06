from django.urls import path
from .views import NewOrder, ClearOrder, EditOrder

urlpatterns = [
    path('new/<int:pk>/', NewOrder.as_view()),
    path('clear/<int:pk>/', ClearOrder.as_view()),
    path('edit/<int:pk>/', EditOrder.as_view())
]
