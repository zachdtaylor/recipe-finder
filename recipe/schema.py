import graphene
from graphene_django.types import DjangoObjectType
from recipe.models import Recipe, Ingredient
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

class RecipeType(DjangoObjectType):
  class Meta:
    model = Recipe

class IngredientType(DjangoObjectType):
  class Meta:
    model = Ingredient

# class AmountType(DjangoObjectType):
#   class Meta:
#     model = Amount

class Query(graphene.ObjectType):
  recipe = graphene.List(
    RecipeType,
    description='Return recipe information'
  )

  def resolve_recipe(self, info):
    return Recipe.objects.all()

class AddRecipe(graphene.Mutation):
  class Arguments:
    name = graphene.String()
    ingredients = graphene.List(graphene.String)
    instructions = graphene.String()

  recipe = graphene.Field(RecipeType)

  def mutate(self, info, name, ingredients, instructions):
    try:
      recipe = Recipe.objects.create(name=name, instructions=instructions)
      for ingredient in ingredients:
        obj, created = Ingredient.objects.get_or_create(name=ingredient)
        print(obj)
        recipe.ingredients.add(obj)
      return AddRecipe(recipe)
    except Exception as e:
      raise GraphQLError(str(e))

class Mutation(graphene.ObjectType):
  addRecipe = AddRecipe.Field()