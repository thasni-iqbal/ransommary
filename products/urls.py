from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='home-page'),
    path('company-profile', views.CompanyProfilePageView.as_view(), name='company-profile'),
    path('company-mission-vision', views.CompanyVisionPageView.as_view(), name='company-mission-vision'),
    path('contact-us', views.ContactUsPageView.as_view(), name='contact-us'),
    path('categories', views.CategoryListView.as_view(), name='category-list'),
    re_path(r'^category/(?P<slug>[\w-]+)/$', views.category_detail, name='category-detail'),
    re_path(r'^(?P<category_slug>[\w-]+)/(?P<slug_subcategory>[\w-]+)/$', views.ProductListView.as_view(), name='product-list'),
    path('brand', views.BrandListView.as_view(), name='brand-list'),
]