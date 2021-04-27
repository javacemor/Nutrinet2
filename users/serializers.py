from rest_framework.authtoken.views import Token
from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

        extra_kwargs = {'password':{
            'write_only': True, #so that password is not returned to the view
            'required': True
        }}

    # OVERRIDING THE DEFAULT CREATE METHOD IN ORDER TO MAKE HASH PASSWORD
    # CREATE TOKEN FOR THE USER
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #solves password hash problem
        Token.objects.create(user=user) # solves user token problem
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'image', 'occupation', 'nationality', 'poids', 'taille',  'date_de_naissance', 'genre', 'activite']


#  GENERAL SERIALIZER CLASS
# class ArticleSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=100)
#     description = serializers.CharField(max_length=500)

#     def create(self, validated_data):
#         return Article.objects.create(validated_data)
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)

