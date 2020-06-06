from django.urls import path
from .views import ValuationData, GrowthData

urlpatterns = [
    path('value/<int:pk>', ValuationData.as_view()),
    path('growth/<int:pk>', GrowthData.as_view()),
    # path('value/', ValuationData.as_view())
]
