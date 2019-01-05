from django.db import models
from django.template.defaultfilters import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    features = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='documents/%Y/%m/%d')
    slug = models.SlugField(editable=False)  # hide from admin

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

    def save(self):
        if not self.id:
            self.slug = slugify(self.name)
        super(Category, self).save()


class SubCategory(models.Model):
    category = models.ForeignKey(Category, default=0, on_delete=models.CASCADE, )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    features = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='subcategories/%Y/%m/%d', blank=True, null=True)
    slug = models.SlugField(editable=False)  # hide from admin

    class Meta:
        verbose_name_plural = "subcategories"

    def __str__(self):
        return self.name

    def save(self):
        if not self.id:
            self.slug = slugify(self.name)
        super(SubCategory, self).save()


class Product(models.Model):
    subcategory = models.ForeignKey(SubCategory, default=0, on_delete=models.CASCADE, )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    features = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='product/%Y/%m/%d')
    slug = models.SlugField(editable=False)  # hide from admin

    def __str__(self):
        return self.name

    def save(self):
        if not self.id:
            self.slug = slugify(self.name)
        super(Product, self).save()


class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='documents/brand')
    slug = models.SlugField(editable=False)  # hide from admin

    class Meta:
        verbose_name_plural = "brands"

    def __str__(self):
        return self.name

    def save(self):
        if not self.id:
            self.slug = slugify(self.name)
        super(Brand, self).save()


class Banner(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='documents/banner')

    class Meta:
        verbose_name_plural = "banners"

    def __str__(self):
        return self.name
