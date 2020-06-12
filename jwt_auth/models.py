from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=300)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    money = models.IntegerField(default=100000)
    total_money = models.IntegerField(blank=True,null=True)
    experience = models.CharField(max_length=20, blank=True, null=True )