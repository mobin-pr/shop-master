from django.db import models
from account.models import User
from django.utils import timezone
# Create your models here.


class Category(models.Model):
    parent=models.ForeignKey('self',default=None,null=True,blank=True,on_delete=models.SET_NULL,related_name="children",verbose_name=  "  زیر دسته")     #models.CASCADE when the parent delete child delete
    title=models.CharField(max_length=200,verbose_name="عنوان دسته بندی")
    slug=models.SlugField(max_length=100,unique=True,verbose_name="آدرس دسته بندی")
    status=models.BooleanField(default=True,verbose_name="آیا نمایش داده شود")
    position=models.IntegerField(verbose_name="موقعیت")
    class Meta:
        verbose_name="دسته  بندی"
        verbose_name_plural="دسته بندی ها"
        ordering=['parent__id','position']
    def __str__(self):
        return self.title


class Product(models.Model):
    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"
    title = models.CharField(max_length=250,verbose_name="عنوان")
    slug = models.SlugField(verbose_name="آدرس")
    producer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'is_staff': True},
        related_name="products",
        verbose_name="سازنده"
    )
    category=models.ManyToManyField(Category,verbose_name="دسته بندی ",related_name="products")
    content = models.TextField(verbose_name="توضیحات")
    image = models.ImageField(upload_to='products/', verbose_name="عکس محصول", blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now,verbose_name="زمان ساخت")
    price = models.IntegerField(verbose_name="قیمت",default=1)
    status = models.BooleanField(default=True,verbose_name="وضعیت")

    def __str__(self): 
        return self.title
