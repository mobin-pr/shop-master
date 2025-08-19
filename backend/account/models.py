from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import re
# Create your models here.



def validate_phone_number(value):
    if not re.fullmatch(r'^09\d{9}$', value):
        raise ValidationError('شماره تلفن باید 11 رقم باشد و با 09 شروع شود.')

class User(AbstractUser):
    is_producer=models.BooleanField(default=False,verbose_name="وضعیت نویسندگی")
    bio =models.CharField(max_length=250,verbose_name="مشحصات کاربری")
    phone_number =models.CharField(max_length=11,
        validators=[validate_phone_number],
        unique=True, 
        verbose_name="شماره تلفن")
    
    address = models.CharField(max_length=10000,verbose_name="آدرس")
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True, verbose_name="تصویر پروفایل")



class ContactMessage(models.Model):
    class Meta:
        verbose_name = "پیام  دریافتی"
        verbose_name_plural = "پیام های دریافتی"

    name = models.CharField(max_length=50,verbose_name="نام فرستنده")
    email = models.EmailField(verbose_name="ایمیل فرستنده")
    message = models.TextField(verbose_name="پیام")
    created_at = models.DateTimeField(verbose_name="ساحته شده در", auto_now_add=True)
    def __str__(self):
        return f"پیام فرستاده شد از طرف {self.name} در تاریخ {self.created_at}"
    

