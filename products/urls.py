from django.urls import path
from .views import products, testing, my_products, my_product_filters

urlpatterns = [
    path('testing/', testing),
    path('my_products/<token>', my_products),
    path('my_product_filters/<token>', my_product_filters),
    path('', products),
]