from rest_framework.authtoken.views import Token
from rest_framework import serializers

from .models import Product, GroceryList, GroFilters

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'code', 'product_name', 'pnns_groups_1', 'main_category', 'categories', 'image_url', 'image_small_url']


class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = ['id', 'user', 'product', 'product_name', 'image_url', 'weeks', 'units']


class GroFiltersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroFilters
        fields = [
            'id', 'user', 'weekgro', 'Supermarket', 
            'NOingredients', 'maxnringredients', 'NOadditives', 
            'maxnradditives',
            'nova_group',
            'nutriscore_grade',
            'Allergens',
            'BIO',
            'Vegetarian',
            'Halal',
            'Vegan',
            'highproteins',
            'lowproteins',
            'lowfats',
            'NOsatfats',
            'NOtransfats',
            'lowsugar',
            'lowsalt',
            'highfiber',
            'lowcarbo',
            'highcarbo',
            'brand',
            'NObrand',
            'origin',
            'NOorigin',
            'NOpackaging'
            ]

