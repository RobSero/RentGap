from django.db import models

# Create your models here.
class Article(models.Model):
  title = models.CharField(max_length=100)
  content = models.CharField(max_length=500)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  image = models.CharField(max_length=200)
  author = models.ForeignKey(
    'jwt_auth.User',
    related_name='articles',
    on_delete=models.PROTECT
  )
  
  def __str__(self):
    return f'Article - {self.title} - {self.author}'