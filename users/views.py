from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.shortcuts import render

# Rest Framework Imports
from rest_framework.decorators import api_view

# local imports
from .models import Profile
from products.models import GroceryList
from .serializers import UserSerializer, ProfileSerializer


@api_view(['GET', 'POST'])
def profile_details(request, token):
    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        print("TOKEN DOES NOT EXIST")
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        user.first_name = request.data['prenom']
        user.last_name = request.data['famille']
        user.save()

        serializer = ProfileSerializer(data=request.data)
        serializer.initial_data['user'] = user.pk

        # print(request.data['token'])
        # serializer.initial_data['what'] = 'do not 222'
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('ERROR:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)

        products_user = GroceryList.objects.filter(user=user)

        kcals=[]
        Fats=[]
        Carbos=[]
        Proteins=[]
        Sat_Fats=[]
        Trans_Fats=[]
        Sugars=[]
        Salts=[]
        Fibers=[] 
        
        for produ in products_user:
            kcals.append(produ.product.energy_kcal_100g*produ.product.quantity*produ.units/(100*produ.weeks)) 
            Fats.append(produ.product.fat_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Carbos.append(produ.product.carbohydrates_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Proteins.append(produ.product.proteins_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Sat_Fats.append(produ.product.saturated_fat_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Trans_Fats.append(produ.product.trans_fat_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Sugars.append(produ.product.sugars_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Salts.append(produ.product.salt_100g*produ.product.quantity*produ.units/(100*produ.weeks))
            Fibers.append(produ.product.fiber_100g*produ.product.quantity*produ.units/(100*produ.weeks))

        kcaltotal=0
        Fattotal=0
        Carbototal=0
        Proteintotal=0
        Sat_Fattotal=0
        Trans_Fattotal=0
        Sugartotalt=0
        Salttotal=0
        Fiberstotal=0
          
        for kcal in kcals:
            kcaltotal+=kcal
        for fat in Fats:
            Fattotal+=fat
        for carbo in Carbos:
            Carbototal+=carbo
        for pro in Proteins:
            Proteintotal+=pro
        for satfat in Sat_Fats:
            Sat_Fattotal+=satfat
        for tf in Trans_Fats:
            Trans_Fattotal+=tf
        for sugar in Sugars:
            Sugartotalt+=sugar
        for salt in Salts:
            Salttotal+=salt
        for fib in Fibers:
            Fiberstotal+=fib

        details = {
            'kcal_week_goal': profile.kcal_week_goal(),
            'fats_max': profile.fats_max(),
            'fats_min': profile.fats_min(),
            'carbohydrates_max': profile.carbohydrates_max(),
            'carbohydrates_min': profile.carbohydrates_min(),
            'proteins_max': profile.proteins_max(),
            'proteins_min': profile.proteins_min(),
            'transfats_max': profile.transfats_max(),
            'sugars_max': profile.sugars_max(),
            'satfats_max': profile.satfats_max(),
            'salt_max': profile.salt_max(),
            'fibers_min': profile.fibers_min(),
            # 'kcals': kcals,
            # 'Fats': Fats,
            # 'Carbos': Carbos,
            # 'Proteins': Proteins,
            # 'Sat_Fats': Sat_Fats,
            # 'Trans_Fats': Trans_Fats,
            # 'Sugars': Sugars,
            # 'Salts': Salts,
            # 'Fibers': Fibers,
            'kcaltotal': kcaltotal,
            'Fattotal': Fattotal,
            'Carbototal': Carbototal,
            'Proteintotal': Proteintotal,
            'Sat_Fattotal': Sat_Fattotal,
            'Trans_Fattotal': Trans_Fattotal,
            'Sugartotalt': Sugartotalt,
            'Salttotal': Salttotal,
            'Fiberstotal': Fiberstotal,
        }
        return Response({'data':serializer.data, 'details': details})


@api_view(['GET', 'POST'])
def users_all(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def account_settings(request, token):
    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        print("TOKEN DOES NOT EXIST")
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user = User.objects.get(pk=user.pk)
        user_profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(user_profile)
        serialized_user = {
            'username': user.username,
            'email':  user.email,
            'first_name':  user.first_name,
            'last_name':  user.last_name
        }
        return Response({'data':serializer.data, 'user':serialized_user})

    elif request.method == 'PUT':
        # serializer = ProfileSerializer(data=request.data)
        # serializer.initial_data['user'] = user.pk
        profile = Profile.objects.get(user=user)

        user.first_name = request.data['prenom']
        user.last_name = request.data['famille']
        user.email = request.data['email']
        user.username = request.data['username']
        
        user.save()

        profile.poids = request.data['poids']
        profile.taille = request.data['taille']
        profile.date_de_naissance = request.data['date_de_naissance']
        profile.genre = request.data['genre']
        profile.activite = request.data['activite']

        profile.save()
        
        return Response({}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_username(request, token):
    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        print("TOKEN DOES NOT EXIST")
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user = User.objects.get(pk=user.pk)
        return Response(user.username)
        