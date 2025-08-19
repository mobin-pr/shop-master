from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,ContactMessage

# Register your models here.
UserAdmin.fieldsets = (
    ("Personal info", {"fields": ("username", "first_name", "last_name", "email")}),
    ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "is_producer", "groups", "user_permissions")}),
    ("Additional Info", {"fields": ("phone_number", "address", "bio","profile_picture")}),
    ("Important dates", {"fields": ("last_login", "date_joined")}),
)


UserAdmin.list_display+=('is_producer',)
admin.site.register(User, UserAdmin)
admin.site.register(ContactMessage)