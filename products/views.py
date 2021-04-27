from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import status

import openpyxl
import os

# Rest Framework Imports
from rest_framework.decorators import api_view

# local imports
from .serializers import ProductSerializer, GroceryListSerializer, GroFiltersSerializer
from .models import Product, GroceryList, GroFilters


@api_view(['GET', 'POST'])
def products(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def my_products(request, token):
    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        products = GroceryList.objects.filter(user=user)
        serializer = GroceryListSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        product_id = request.data['product_id']
        product = Product.objects.get(id=product_id)

        grocery_list = GroceryList.objects.filter(user=user)
        
        for prod in grocery_list:
            if prod.product.id == product_id:
                prod.units += 1
                prod.save()
                return Response({}, status=status.HTTP_201_CREATED)
        
        request.data['user'] = user.pk
        request.data['product'] = product.pk
        request.data['image_url'] = product.image_url
        request.data['product_name'] = product.product_name
        serializer = GroceryListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('no valid', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        products = GroceryList.objects.filter(user=user)
        product_id = request.data['product_id']
        action = request.data['action']
        weeks = request.data['weeks']

        for product in products:
            if product.id == product_id:
                product = product

                if action == 'increment':
                    product.units += 1
                elif action == 'decrement':
                    if product.units < 1 or product.units == 1:
                        product.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
                    else:
                        product.units -= 1
                elif action == 'updateWeeks':
                    product.weeks = weeks

                product.save()
        return Response({}, status=status.HTTP_201_CREATED)
        
    elif request.method == 'DELETE':
        products = GroceryList.objects.filter(user=user)
        product_id = request.data['product_id']
        for product in products:
            if product.id == product_id:
                product.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def my_product_filters(request, token):
    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        pass
        # serializer = UserSerializer(user)
        # return Response(serializer.data)
    elif request.method == 'POST':
        request.data['user'] = user.pk
        p = GroFilters.objects.get(user=2)
        serializer = GroFiltersSerializer(p, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('NOT VALID')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        pass
        # user.delete()
        # return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'PUT', 'DELETE'])
# def product_detail(request, pk):
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = UserSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)









BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file = os.path.join(BASE_DIR, "products/file.xlsx")
wb = openpyxl.load_workbook(file)

# wb = openpyxl.load_workbook('file.xlsx')
sh1 = wb['Sheet1']
row = sh1.max_row
column = sh1.max_column

def testing(request): 
    # for i in range(1, row + 1):
    #     for j in range(1, column + 1):
    #         print(sh1.cell(i, j).value)

    product_list = []

    for x in range(1, 1001):
        product_dict = {}
        for i in range(1, column + 1):
            key = sh1.cell(row=1, column=i).value
            value = sh1.cell(row=x + 1, column=i).value
            product_dict[key] = value
        product_list.append(product_dict)

    for a in product_list:
        code = a['code']
        product_name = a['product_name']
        categories = a['categories']
        image_url = a['image_url']
        image_small_url = a['image_small_url']
        main_category = a['main_category']
        pnns_groups_1 = a['pnns_groups_1']
        
        Product.objects.create(
            code= code,
            product_name=product_name,
            categories = categories,
            image_url = image_url,
            image_small_url = image_small_url,
            main_category = main_category,
            pnns_groups_1=pnns_groups_1
            )
   
    return render(request, 'products/testing.html')

