# pylint: disable=no-member, no-self-use
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from orders.models import Order
from properties.models import Property
from jwt_auth.serializers import UserSerializer
from properties.models import Property
User = get_user_model()


class LeaderboardIndex(APIView):
  
  # used to sort orders by total money
  def most_money(self, user):
    return user.total_money
  
  
  # RETURN TOP 20 USERS RANKED BY TOTAL MONEY (MONEY + ALL CURRENT ORDER VALUES)
  # GET request to - baseurl/leaderboard
  # No body required or valid token
  def get(self,req):
    # get all users
    all_users = User.objects.all()
    users_leaderboard = []
    # Go through each user and sum all their orders. Save the users' total to the database
    for user in all_users:
      user.total_money = user.money
      # get orders
      user_orders = Order.objects.filter(user=user.id).filter(active=True)
      for order in user_orders:
        # get property
        property_owned = Property.objects.get(pk=order.property_detail.id)
        # Add the value of their investment to the users total_money
        user.total_money += property_owned.current_valuation * order.ownership
        # If user has exactly £500k, they have never made any investements at all so should not be included
      if user.total_money != 500000:
        users_leaderboard.append(user)
      user.save()
    
    
    # Sort List in decending order by total money
    users_leaderboard.sort(key=self.most_money, reverse=True)
    serialized_leaderboard = UserSerializer(users_leaderboard, many=True)
    
    # Only send first 20 users
    return Response(serialized_leaderboard.data[:20])
    