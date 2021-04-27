from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from .models import Product, GroceryList, GroFilters

# Register your models here.

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    pass

admin.site.register(GroceryList)
admin.site.register(GroFilters)
