from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.urls import reverse

from lib2to3.tests.data.infinite_recursion import BIO
from PIL import Image
import datetime


def upload_location(instance, filename, *args, **kwargs):
    file_path = 'profile/{author_id}/{filename}'.format(author_id=str(instance.user.id), filename=filename)
    return file_path


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    image = models.ImageField(upload_to=upload_location, blank=True, null=True)
    occupation = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    ########
    poids= models.PositiveIntegerField(default='1', null=True, blank=True)
    taille = models.PositiveIntegerField(default='1', null=True, blank=True)
    date_de_naissance = models.DateField(null=True, blank=True)
    genre = models.CharField(max_length=200, null=True, default='Femme', blank=True)
    
    #Activite_choice = (
        #('0', 'None'),
        #('1', '1 à 3 jours par semaine'),
        #('2', '3 à 5 jours par semaine'),
        #('3', '6 à 7 jours par semaine'),
        #('4', 'Deux fois par jour'),
    #)
    
    activite = models.CharField(max_length=200, null=True, default='None', blank=True)
    
    def kcal_week_goal(self):   #ESTOOOO
        dob = self.date_de_naissance
        today = datetime.date.today()
        age = (today.year-dob.year)- ((today.month,today.day)<(dob.month,dob.day))
       
        if self.genre=='Homme':
            BMR=(10*self.poids)+(6.25*self.taille)-(5.0*age)-161
        if self.genre=='Femme':
            BMR=(10*self.poids)+(6.25*self.taille)-(5.0*age)+5 #si () no en admin


        if self.activite=='None':
            kcal_day=BMR*1.2  #aqi el lio
            
        if self.activite=='1 à 3 jours par semaine':
            kcal_day=BMR*1.375
        if self.activite=='3 à 5 jours par semaine':
            kcal_day=BMR*1.55
        if self.activite=='6 à 7 jours par semaine':
            kcal_day=BMR*1.725
        if self.activite=='Deux fois par jour':
            kcal_day=BMR*1.9

        kcal_week_need=kcal_day*7.0
        
        BMI=round((self.poids)/((self.taille/100)**2),1)
        
        if BMI < 18.5:   #AQUI LIO AHORA, Q EL SIGNO SYMBOL
            BMI_v='0'
        elif BMI <= 24.99 and BMI >= 18.5: ##ideal
            BMI_v='1'
        elif BMI < 29.99 and BMI > 24.99: ##overweight
            BMI_v='2'
        elif BMI > 29.99: ##obese
            BMI_v='3'
    
 
        #global kcal_week_goal
        if BMI_v=='0':
            kcal_week_goal=round(kcal_week_need+1750,0)
        
        elif BMI_v=='1':
            kcal_week_goal=round(kcal_week_need,0) 
            #print('Your weight is IDEAL, to keep it you need to consume:',self.kcal_week_goal,'kcal per week')
        elif BMI_v=='2':
            kcal_week_goal=round(kcal_week_need-1750,0)
            #print('You are slightly OVERWEIGHT, you need to consume:',self.kcal_week_goal,'kcal per week, to lose about 1kg per month')
            #print ('Remember! It is for your health! A faster weight loss would change your eating habits and would be harmful in the long run')
        elif BMI_v=='3':
            kcal_week_goal=round(kcal_week_need-3500,0)
            #print('You have OBESITY, you need to consume:',self.kcal_week_goal,'kcal per week, to lose about 2kg per month')
            #print ('Remember! It is for your health! A faster weight loss would change your eating habits and would be harmful in the long run')
        try:
            self.kcal_week_goal=kcal_week_goal  #esto lo q no devuelve en courses
            return self.kcal_week_goal
        except:
            self.kcal_week_goal=1000  #esto lo q devuelve en courses
            return self.kcal_week_goal
        
    def fats_max(self):#
        self.fats_max=round(0.3*self.kcal_week_goal/9,0) 
        return self.fats_max
        
    def fats_min(self):#
        self.fats_min=round(0.1*self.kcal_week_goal/9,0)
        return self.fats_min
                    
    def satfats_max(self):# #saturated fats
        self.satfats_max=round(0.01*self.kcal_week_goal,0)#Asi calcular seguro???
        return self.satfats_max
        
    def transfats_max(self):#
        self.transfats_max=round(0.001*self.kcal_week_goal,0)#Asi calcular seguro???
        return self.transfats_max
        
    def carbohydrates_max(self):#
        self.carbohydrates_max=round(0.6*self.kcal_week_goal/4,0) #o glucidos
        return self.carbohydrates_max
        
    def carbohydrates_min(self):#
        self.carbohydrates_min=round(0.3*self.kcal_week_goal/4,0)
        return self.carbohydrates_min
        
    def sugars_max(self):#
        self.sugars_max=round(0.05*self.kcal_week_goal,0)#Quitar el de la fruta??
        return self.sugars_max
        
    def proteins_max(self):#
        self.proteins_max=round(0.5*self.kcal_week_goal/4,0)
        return self.proteins_max
            
    def proteins_min(self):#
        self.proteins_min=round(0.15*self.kcal_week_goal/4,0)
        return self.proteins_min
        
    def salt_max(self):#
        self.salt_max=float(5*7)
        return self.salt_max

    def fibers_min(self):#
        self.fibers_min=float(25*7)
        return self.fibers_min

    def __str__(self):
        return f"{self.user.username} profile"

    # reduce the size of the image if it's more than 1000px
    def save(self, *args, **kwargs):
        super().save( *args, **kwargs)
        
        if self.image:
            img = Image.open(self.image.path)
            if img.height > 1000 or img.width > 1000:
                output = (600, 600)
                img.thumbnail(output)
                img.save(self.image.path)

    def __str__(self):
        return f"{self.user.username} profile"


# def user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# post_save.connect(user_profile, sender=User)


@receiver(post_delete, sender=Profile)
def delete_image(sender, instance, *args, **kwargs):
    instance.image.delete(False)
