from django.db import models

# Create your models here.
class Order(models.Model):
    valueAtTime = models.IntegerField()
    investment = models.IntegerField()
    ownership = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    property_id = models.ForeignKey(
        'properties.Property',
        related_name='orders',
        on_delete=models.PROTECT
    )
    user_id = models.ForeignKey(
      'jwt_auth.User',
      related_name='orders',
      on_delete=models.PROTECT
    )
    
    def __str__(self):
        return f'Order - {self.property_id}'
    