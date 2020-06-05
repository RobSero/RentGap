from django.db import models

# Create your models here.
class Order(models.Model):
    value_at_time = models.IntegerField()
    investment = models.IntegerField()
    ownership = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    property_detail = models.ForeignKey(
        'properties.Property',
        related_name='orders',
        on_delete=models.PROTECT
    )
    user = models.ForeignKey(
      'jwt_auth.User',
      related_name='orders',
      on_delete=models.PROTECT
    )
    
    def __str__(self):
        return f'Order - {self.property_id} - Investment: {self.investment} - Ownership: {self.ownership}%'
    