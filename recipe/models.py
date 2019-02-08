from django.db import models
from django_measurement.models import MeasurementField
from measurement.measures import Volume

# class IngredientTypes
#   name bacon

class Ingredient(models.Model):
    name = models.CharField(max_length=100)

# class Amount(models.Model):
#     measurement = MeasurementField(measurement=Volume, primary_key=True)
#     # recipe = models.ForeignKey(Recipe, models.CASCADE, related_name='amounts')

#     # Ingredients
#     # type amount recipe

class Recipe(models.Model):
    name = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    instructions = models.TextField()
