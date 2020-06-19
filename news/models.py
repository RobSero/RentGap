from django.db import models

# Create your models here.
class NewsArticle(models.Model):
  title = models.CharField(max_length=300)
  description = models.CharField(max_length=700)
  published_at = models.CharField(max_length=300)
  url_link = models.CharField(max_length=300)
  image = models.CharField(max_length=300)
  source = models.CharField(max_length=300)
  author = models.CharField(max_length=250)
  
  def __str__(self):
    return f'{self.title} - {self.author}'