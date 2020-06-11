from django.urls import path
from .views import LeaderboardIndex

urlpatterns = [
    path('', LeaderboardIndex.as_view()),
]
