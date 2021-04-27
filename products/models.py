from django.db import models
import datetime
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from lib2to3.tests.data.infinite_recursion import BIO

#from django.dispatch import receiver
#from ShoppingList.admin import UserAdmin
 
class GroceryProfile(models.Model): #Question
    user = models.OneToOneField(User,related_name="grocery",on_delete=models.CASCADE) #question_text
 
class UserProfile(models.Model):
    #user = models.ForeignKey(GroceryProfile, on_delete=models.CASCADE)  #question
    user = models.OneToOneField(User,related_name="profile", on_delete=models.CASCADE, null=True)
    
    #username=User.get_username 
    #fullname = models.CharField(max_length=200, default='name', blank=True)
    #email=models.EmailField(default='email', blank=True)
    Poids= models.PositiveIntegerField(default='1', null=True, blank=True)
    Taille = models.PositiveIntegerField(default='1', null=True, blank=True)
    date_de_naissance = models.DateField(null=True, blank=True)
    
    #Genre_choice = (
    #('0', 'Homme'),
        #('1', 'Femme'),
    #)
    
    Genre = models.CharField(max_length=200, null=True, default='Femme', blank=True)
    
    #Activite_choice = (
        #('0', 'None'),
        #('1', '1 à 3 jours par semaine'),
        #('2', '3 à 5 jours par semaine'),
        #('3', '6 à 7 jours par semaine'),
        #('4', 'Deux fois par jour'),
    #)
    
    Activite = models.CharField(max_length=200, null=True, default='None', blank=True)
    
    ''' 
    def BMI(self):
        BMI=round((self.Poids)/((self.Taille/100)**2),1)
        self.BMI=str(BMI)
        return self.BMI #esto si lo pilla
      
    def BMI_v(self): #aqui fallo
        
        try:
            if self.BMI < '18.5':   #AQUI LIO AHORA, Q EL SIGNO SYMBOL
                BMI_v='0'
            elif self.BMI <= '24.99' and self.BMI >= '18.5': ##ideal
                BMI_v='1'
            elif self.BMI < '29.99' and self.BMI > '24.99': ##overweight
                BMI_v='2'
            elif self.BMI > '29.99': ##obese
                BMI_v='3'
            else:
                BMI_v='4'
                
            self.BMI_v=BMI_v
            return self.BMI_v
        except:
            self.BMI_v='5'
            return self.BMI_v
    '''  
    def kcal_week_goal(self):   #ESTOOOO
        
        #if self.date_de_naissance: 
        dob=self.date_de_naissance
        today=datetime.date.today()
        age= (today.year-dob.year)- ((today.month,today.day)<(dob.month,dob.day))
        #if not self.date_de_naissance: 
            #age=1.0
##  fórmula de Harris-Benedict 1990, ultima variacion: Hombres:TMB = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5 // Mujer:TMB = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
##  BMR es Basal Metabolic Rate (TMB es Tasa Metabolica Basal) , es decir las kcal q por peso, edad, sexo y altura le corresponde (Sin encuenta actividad..)
        
        if self.Genre=='Homme':
            BMR=(10*self.Poids)+(6.25*self.Taille)-(5.0*age)-161
        if self.Genre=='Femme':
            BMR=(10*self.Poids)+(6.25*self.Taille)-(5.0*age)+5 #si () no en admin


        if self.Activite=='None':
            kcal_day=BMR*1.2  #aqi el lio
            
        if self.Activite=='1 à 3 jours par semaine':
            kcal_day=BMR*1.375
        if self.Activite=='3 à 5 jours par semaine':
            kcal_day=BMR*1.55
        if self.Activite=='6 à 7 jours par semaine':
            kcal_day=BMR*1.725
        if self.Activite=='Deux fois par jour':
            kcal_day=BMR*1.9
        #else:
            #kcal_day=1000 #esto en model
              
        #self.kcal_day=round(kcal_day,1)
        #return self.kcal_day
    
        
    
    
## maximo cambio 500kcal al dia, as o menos. que son 3500kcal a la semana, que equivale a medio kilo. 7000Kcal es un kilo mas o menos
        kcal_week_need=kcal_day*7.0
        
        BMI=round((self.Poids)/((self.Taille/100)**2),1)
        
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
            #print('Your weight is LOW, you need to consume:',self.kcal_week_goal,'kcal per week, to gain about 1kg per month')
            #print ('Remember! It is for your health! A faster weight gain would change your eating habits and would be harmful in the long run')
        
        elif BMI_v=='1':
            #try:
            kcal_week_goal=round(kcal_week_need,0) 
            #except:
                #kcal_week_goal=2
            #print('Your weight is IDEAL, to keep it you need to consume:',self.kcal_week_goal,'kcal per week')
        elif BMI_v=='2':
            kcal_week_goal=round(kcal_week_need-1750,0)
            #print('You are slightly OVERWEIGHT, you need to consume:',self.kcal_week_goal,'kcal per week, to lose about 1kg per month')
            #print ('Remember! It is for your health! A faster weight loss would change your eating habits and would be harmful in the long run')
        elif BMI_v=='3':
            kcal_week_goal=round(kcal_week_need-3500,0)
            #print('You have OBESITY, you need to consume:',self.kcal_week_goal,'kcal per week, to lose about 2kg per month')
            #print ('Remember! It is for your health! A faster weight loss would change your eating habits and would be harmful in the long run')
        #self.kcal_week_goal=kcal_week_goal
        #return kcal_week_goal
        
        #si q sale q kcal_week_goal es lo q sea.(day*7-3500), pero no devuelve
        try:
            self.kcal_week_goal=kcal_week_goal  #esto lo q no devuelve en courses
            return self.kcal_week_goal
        except:
            self.kcal_week_goal=1000  #esto lo q devuelve en courses
            return self.kcal_week_goal
        
####si dice q va al super cada 2 semanas, entonces cambiar aqui, pero mas adelante
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
        return self.user.username
    
    



  
class Product(models.Model):

    code=models.CharField(max_length=200,default=0) #barcode of the product (can be EAN_13 or internal codes for some food stores), for products without a barcode, Open Food Facts assigns a number starting with the 200 reserved prefix
    product_name =models.CharField(max_length=200,default=0, null=True) #name of the product
    generic_name=models.CharField(max_length=200,default=0)
    quantity =models.DecimalField(max_digits=8, decimal_places=2, default=1) #quantity and unit
    unit_quantity=models.CharField(max_length=200,default=0)
    packaging=models.CharField(max_length=200,default=0)
    brands=models.CharField(max_length=200,default=0)
    categories=models.CharField(max_length=200, null=True)
    origins=models.CharField(max_length=200,default=0) #origins of ingredients
    labels=models.CharField(max_length=200,default=0)
    stores=models.CharField(max_length=200,default=0)
    countries=models.CharField(max_length=200,default=0) #list of countries where the product is sold
    ingredients_text=models.CharField(max_length=200,default=0)
    allergens_tags=models.CharField(max_length=200,default=0)
    traces=models.CharField(max_length=200,default=0)
    additives_n=models.DecimalField(max_digits=8, decimal_places=2, default=0) #number of food additives
    additives_tags=models.CharField(max_length=200, default=0)# name of additives
    ingredients_from_palm_oil_n=models.DecimalField(max_digits=8, decimal_places=2, default=0)#Num ingredientes, si mas de uno decir q de palm oil
    nutriscore_grade=models.CharField(max_length=200,default=0) #nutrition grade ('a' to 'e'). see http://fr.openfoodfacts.org/score_nutritionnel_experimental_france
    nova_group=models.IntegerField(default=0) 
    pnns_groups_1=models.CharField(max_length=200,default=0) #GRUPOS PARA ELEGIR
    pnns_groups_2=models.CharField(max_length=200,default=0)
    main_category=models.CharField(max_length=200,default=0, null=True)
    image_url=models.CharField(max_length=200,default=0, null=True)
    image_small_url=models.CharField(max_length=200,default=0, null=True)
    image_ingredients_url=models.CharField(max_length=200,default=0)
    image_nutrition_url=models.CharField(max_length=200,default=0)
    energy_kcal_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    saturated_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    monounsaturated_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    polyunsaturated_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    omega_3_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    omega_6_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    trans_fat_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    carbohydrates_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sugars_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    fiber_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    proteins_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    salt_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sodium_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    alcohol_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0) #% vol of alcohol. Mas para ver si algo sin alcohol
    vitamin_a_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_d_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_e_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_c_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_b1_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_b2_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_b3_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0) #tb llamada pp
    vitamin_b6_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_b9_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vitamin_b12_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    biotin_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pantothenic_acid_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    potassium_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    calcium_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    phosphorus_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    iron_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    magnesium_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    zinc_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    copper_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    manganese_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    selenium_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    iodine_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    caffeine_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    fruits_vegetables_nuts_estimate_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    cocoa_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    carbon_footprint_from_meat_or_fish_100g=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    price=models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    def __str__(self):
        return str(self.product_name)
    
    
   



class GroceryList(models.Model): #choice, dentro de Grocery profile
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  #question
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_name =models.CharField(max_length=200, blank=True, null=True)
    image_url=models.CharField(max_length=200, blank=True, null=True)
    weeks = models.PositiveIntegerField(default=1) #choice_text
    units = models.IntegerField(default=1) #votes

    def __str__(self):
        return str(self.product)

    #def __str__(self):
        #return self.product.id #x str sera product name 

class GroFilters(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='gf_user')
    
    #Supermarket:
    weekgro = models.PositiveIntegerField(default=1) #Esto diferente a week de grocery list q por producto, aqui cuanto voy. En calculos solo q x2 si 2...No realmente en filtros, mas en userprofile
    Supermarket=models.CharField(max_length=200,default=0) #mas de uno con coma??
    
    #Processed:
    NOVA_0 = models.BooleanField(default='False') 
    NOVA_1 = models.BooleanField(default='False')
    NOVA_2 = models.BooleanField(default='False')
    NOVA_3 = models.BooleanField(default='False')
    NOVA_4 = models.BooleanField(default='False')
    
    NOingredients=models.CharField(max_length=200,default=0)
    maxnringredients=models.PositiveIntegerField(default=100) #QUITAR
    
    NOadditives=models.CharField(max_length=200,default=0) #se diria q es un ingrediente? 
    maxnradditives=models.PositiveIntegerField(default=100)
    
    Nutriscore_A = models.BooleanField(default='False')
    Nutriscore_B = models.BooleanField(default='False')
    Nutriscore_C = models.BooleanField(default='False')
    Nutriscore_D = models.BooleanField(default='False')
    
    #Labels, philosphie of life
    Allergens=models.CharField(max_length=200,default=0)  #allergens or traces - gluten, lacotse, fish...
    
    BIO= models.BooleanField(default='False')
    Vegetarian= models.BooleanField(default='False')
    Halal= models.BooleanField(default='False')
    Vegan= models.BooleanField(default='False')

    #Nutrients
    highproteins= models.BooleanField(default='False')
    lowproteins= models.BooleanField(default='False')
    lowfats= models.BooleanField(default='False')
    NOsatfats= models.BooleanField(default='False')
    NOtransfats= models.BooleanField(default='False')
    lowsugar= models.BooleanField(default='False')
    lowsalt= models.BooleanField(default='False')
    highfiber= models.BooleanField(default='False')
    lowcarbo= models.BooleanField(default='False')
    highcarbo= models.BooleanField(default='False')
       
    #Boicott:
    brand=models.CharField(max_length=200,default=0)  
    NObrand=models.CharField(max_length=200,default=0) #boicott
    
    origin=models.CharField(max_length=200,default=0) #country or region (UE..)
    NOorigin=models.CharField(max_length=200,default=0) #boicott
    
    NOpackaging=models.CharField(max_length=200,default=0) #mejor a elegir??
    
    
def create_profile(sender, **kwargs):
    user = kwargs["instance"]
    if kwargs["created"]:#esto y q related name
        user_profile = UserProfile(user=user)
        user_profile.save()

post_save.connect(create_profile, sender=User)
    