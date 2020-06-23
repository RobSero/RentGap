from django.contrib import admin
from .models import Property

admin.site.site_header = 'RentGap Admin'

class propertyAdmin(admin.ModelAdmin):
  
  search_fields = ['current_valuation', 'postcode']

admin.site.register(Property, propertyAdmin)