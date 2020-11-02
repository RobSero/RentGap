from django.test import TestCase, Client
client = Client()


class URLGetRequests(TestCase):
  
  def test_frontend_response(self):
    home_get_res = client.get('')
    self.assertEqual(home_get_res.status_code, 200)
    self.assertTemplateUsed(home_get_res, 'build/index.html')
    
    random_URL = client.get('/dogs')
    self.assertEqual(random_URL.status_code, 200)
    self.assertTemplateUsed(random_URL, 'build/index.html')
