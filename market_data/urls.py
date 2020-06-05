from django.urls import path
from .views import ValuationData, GrowthData

urlpatterns = [
    path('value', ValuationData.as_view()),
    path('growth', GrowthData.as_view()),
    # path('value/', ValuationData.as_view())
]
