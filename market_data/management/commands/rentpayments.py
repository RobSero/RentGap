from django.core.management.base import BaseCommand
from orders.models import Order
from properties.models import Property
from django.contrib.auth import get_user_model

User = get_user_model()


    
# THIS HANDLES THE PAYMENTS INTO USERS ACCOUNTS BASED ON HOW MUCH MONTHLY RENTAL INCOME THEY OWN. FUNCTION WILL RUN DAILY
class Command(BaseCommand):
  help = 'Will make payments into all users accounts based on how much rental income they are owed'
  
  def handle(self, *args, **options):
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
      # add to account - This is divided by 30.42 as this function will run daily instead of monthly. limitations of heroku free version of cron
      user.money += (rental_amount_owed / 30.42)
      user.save()