from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer
User = get_user_model()

# FIND USER AND RAISE ERROR IF THEY DO NOT EXIST
def get_user(email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied()

class Register(APIView):
  
      #  -------------------- Create Account  -------------------------
  # POST request to 'auth/register'
  # body required = { refer to userModel for keys }
  # No Token Required
    
    def post(self,req):
        req.data['money'] = 500000
        created_user = UserSerializer(data=req.data) #converts json to python object and runs the validator function
        if created_user.is_valid():
            created_user.save()
            return Response({'message' : 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(created_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    
class LoginView(APIView):
    
          #  --------------------  Login To Account  -------------------------
  # POST request to 'auth/login'
  # body required = {"email": String, "password" : String }
  # No Token Required
        
    def post(self,req):
        email = req.data.get('email')
        password = req.data.get('password')
        # Check for missing email or password
        if not email:
          return Response({'email' : 'Please enter email'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not password:
          return Response({'password' : 'Please enter password'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # Get user
        user = get_user(email)
        if not user.check_password(password):
            raise PermissionDenied()
        user = get_user(email)
        # set expiry date and encode token
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({
            'sub': user.id,
            'exp' : int(dt.strftime('%s'))
        }, settings.SECRET_KEY)
        return Response({'token': token, 'message' : f'Welcome back {user.username}','username': user.username}, status=status.HTTP_202_ACCEPTED)
      
      
class UpdateProfile(APIView):
  def get_updated_user(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied()
          
          
     #  --------------------  Edit Profile  -------------------------
  # PUT request to 'auth/profile'
  # body required = { as per model keys }
  # Valid Token Required matching user and profile
  permission_classes = (IsAuthenticated,)
  
  def put(self,req):
    user = self.get_updated_user(req.user.id)
    # get the user, serialize it
    serialized_user = UserSerializer(user, data=req.data)
    if serialized_user.is_valid():
        serialized_user.save()
        return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
      
    return Response(serialized_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  

class ProfileData(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def get_user_details(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied()
          
          
       #  --------------------  Get Profile Information -------------------------
  # GET request to 'auth/user'
  # No body required
  # Valid Token Required
  def get(self,req):
    print('HELLO')
    user = self.get_user_details(req.user.id)
    serialized_user = UserSerializer(user)
    print(serialized_user.data)
    return Response(serialized_user.data, status=status.HTTP_200_OK)
  