from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/property/', include('properties.urls')),
    path('api/marketdata/', include('market_data.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/comment/', include('comments.urls')),
    path('api/articles', include('advice.urls')),
    path('api/handleorder', include('rentalmanager.urls')),
    path('api/leaderboard', include('leaderboard.urls')),
    path('api/news', include('news.urls')),
    # ANY OTHER URL, WILDCARD, SEND BUILD FOLDER
    re_path(r'^.*$', index)
]
