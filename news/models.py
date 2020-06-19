from django.db import models

# Create your models here.
class NewsArticle(models.Model):
  title = models.CharField(max_length=100)
  description = models.CharField(max_length=500)
  published_at = models.CharField(max_length=100)
  url_link = models.CharField(max_length=200)
  image = models.CharField(max_length=200)
  source = models.CharField(max_length=100)
  author = models.CharField(max_length=150)
  
  def __str__(self):
    return f'{self.title} - {self.author}'