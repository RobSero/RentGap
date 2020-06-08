from django.urls import path
from .views import Register, LoginView, UpdateProfile, ProfileData

urlpatterns = [
    path('register/', Register.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', UpdateProfile.as_view()),
    path('user/', ProfileData.as_view())
]
