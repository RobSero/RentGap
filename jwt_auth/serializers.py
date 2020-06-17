from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
# import django.contrib.auth.password_validation as validations
User = get_user_model()

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)  #This means 'only serialize this field when writing (creating or editting account). It will never serialize and send the password for read requests.
    password_confirmation = serializers.CharField(write_only=True)
    
    def validate(self,data):
      
        password = data.pop('password')  #Pops off the password property from the data object
        password_confirmation = data.pop('password_confirmation') #Pops off the password_confirmation property
        if password != password_confirmation: #Checks if they match
            raise ValidationError({'message' : 'Password Do Not Match'})
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password' : 'WRONG DUDE'})
        data['password'] = make_password(password) #Adds a 'password' property to the data object which has the value of a hashed password
        print('SUCCESS!')
        return data
    
    class Meta:
        model = User
        fields = '__all__'
        
        
        