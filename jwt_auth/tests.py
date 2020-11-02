from django.contrib.auth import get_user_model
from django.test import TestCase, Client
import json

# Create your tests here.
client = Client()
User = get_user_model()

test_user_template = {
	"username": "mrTest",
  "email": "test@email.com",
  "profile_image": "https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/14618/thumb_Screen_Shot_2019-05-30_at_16.42.14.png",
  "first_name": "John",
  "last_name": "Tester",
  "password": "pass",
  "password_confirmation": "pass",
	"experience" : "mid"
}

test_user_login = {
  "email" : test_user_template['email'],
  "password" : test_user_template['password']
}

class UserTest(TestCase):
  def setUp(self):
    new_user = client.post('/api/auth/register/', json.dumps(test_user_template), content_type="application/json")
    self.assertEqual(new_user.status_code, 201)
    
  def test_get_user(self):
    test_user = User.objects.get(pk=1)
    self.assertTrue(test_user)
    self.assertEqual(test_user.username,'mrTest')
  
  
  def test_login_user(self):
    logged_in_user = client.post('/api/auth/login/', json.dumps(test_user_login), content_type="application/json")
    self.assertEqual(logged_in_user.status_code, 202)
    json_response = logged_in_user.data
    self.assertTrue(json_response['token'])

    