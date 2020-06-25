# pylint: disable=no-member,
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order
from properties.models import Property
from django.contrib.auth import get_user_model

User = get_user_model()



# THIS HANDLES THE PAYMENTS INTO USERS ACCOUTS BASED ON HOW MUCH MONTHLY RENTAL INCOME THEY OWN
class OrderHandling(APIView):
  
  def get(self,req):
    # Get All Orders
    all_orders = Order.objects.filter(active=True)
    # loop through orders
    for order in all_orders:
      # get invested property
      invested_property = Property.objects.get(pk=order.property_detail.id)
      # get user
      user = User.objects.get(pk=order.user.id)
      # calculate rental
      rental_amount_owed = invested_property.rental_value * order.ownership
      # add to account
      user.money += rental_amount_owed
      user.save()
    return Response({'message': 'its here!!!'})
      