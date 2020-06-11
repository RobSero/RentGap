from django.urls import path
from .views import ValuationDataOne, GrowthDataOne, ValuationDataAll, GrowthDataAll

urlpatterns = [
    path('value/<int:pk>', ValuationDataOne.as_view()),
    path('value/all', ValuationDataAll.as_view()),
    path('growth/<int:pk>', GrowthDataOne.as_view()),
    path('growth/all', GrowthDataAll.as_view()),
    # path('value/', ValuationData.as_view())
]
