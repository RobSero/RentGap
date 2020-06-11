# pylint: disable=no-member,
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order
from properties.models import Property
from django.contrib.auth import get_user_model

User = get_user_model()


class OrderHandling(APIView):
  
  
  def get(self,req):
    # Get All Orders
    all_orders = Order.objects.filter(active=True)
    # Get Property
    for order in all_orders:
      invested_property = Property.objects.get(pk=order.property_detail.id)
      user = User.objects.get(pk=order.user.id)
      rental_amount_owed = invested_property.rental_value * order.ownership
      print(f'{user} has been creditted {rental_amount_owed} on property: {invested_property}')
      user.money += invested_property.rental_value * order.ownership
      user.save()
    return Response({'message': 'its here!!!'})
      