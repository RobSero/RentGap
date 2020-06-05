from django.urls import path
from .views import Register, LoginView

urlpatterns = [
    path('register/', Register.as_view()),
    path('login/', LoginView.as_view())
]
