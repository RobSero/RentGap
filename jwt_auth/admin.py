from django.contrib import admin
from django.contrib.auth import get_user_model  #If you have extended the user model, use this instead as django gets confused sometimes which model to import

User = get_user_model()  # I will use this method going forward instead of 'from .models import X'

# Register your models here.
admin.site.register(User)