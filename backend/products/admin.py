from django.contrib import admin
from .models import Product,Category


@admin.register(Category)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('parent', 'title', 'status', 'position')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'producer', 'created_date', 'status')