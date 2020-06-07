from django.urls import path
from .views import Portfolio, Watchlist

urlpatterns = [
    path('', Portfolio.as_view() ),
    path('watchlist/', Watchlist.as_view() )
]
