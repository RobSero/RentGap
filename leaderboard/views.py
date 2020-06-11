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
  
  def most_money(self, user):
    return user.total_money
  
  def get(self,req):
    # get all users
    all_users = User.objects.all()
    all_users_leaderboard = []
    for user in all_users:
      user.total_money = user.money
      # print(f'{user} before! : {user.total_money}')
      # get orders
      user_orders = Order.objects.filter(user=user.id).filter(active=True)
      for order in user_orders:
        # get property
        property_owned = Property.objects.get(pk=order.property_detail.id)
        # Add the value of their investment to the users total_money
        user.total_money += property_owned.current_valuation * order.ownership
      # print(f'{user} after! : {user.totalMoney}')
      if user.total_money != 500000:
        all_users_leaderboard.append(user)
      user.save()
    # print(all_users_leaderboard)
    
    
    # Sort List
    all_users_leaderboard.sort(key=self.most_money, reverse=True)
    serialized_leaderboard = UserSerializer(all_users_leaderboard, many=True)
    print(serialized_leaderboard.data[0])
    
    
    return Response(serialized_leaderboard.data[:20])
    