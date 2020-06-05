from django.urls import path
from .views import ValuationData

urlpatterns = [
    path('', ValuationData.as_view()),
    # path('value/', ValuationData.as_view())
]
