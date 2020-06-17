#This acts like the 'SecureRoute' file for my app

from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings  #settings has the SECRET KEY so import that
import jwt  # if you want everything, just type import

User = get_user_model()


class JWTAuthentication(BasicAuthentication):
    
    def authenticate(self,req):
        header = req.headers.get('Authorization')
        if not header:
            return None
        if not header.startswith('Bearer'):
            raise PermissionDenied({'message' : 'Invalid Authorization Header'})
        token = header.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message' : 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})
        return (user, token)