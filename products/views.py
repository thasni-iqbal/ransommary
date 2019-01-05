from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.shortcuts import get_object_or_404
from django.views.generic.list import ListView
from django.views.generic.base import TemplateView
from django.views import View
from django.contrib import messages


def index(request):
    categories = Category.objects.all()
    brands = Brand.objects.all()
    banners = Banner.objects.all()
    return render(request, 'products/index.html', {'categories': categories, 'brands': brands, 'banners': banners})


def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    categories = Category.objects.all()
    context = {
        'category': category,
        'categories': categories
    }
    return render(request, 'products/category_detail.html', context)


class CategoryListView(ListView):
    model = Category
    context_object_name = 'categories'


class ProductListView(ListView):
    model = Product
    template_name = "products/list_view.html"
    context_object_name = 'products'

    def get_queryset(self):
        qs = self.model.objects.all()
        if self.kwargs.get('slug_subcategory'):
            qs = qs.filter(subcategory__slug=self.kwargs['slug_subcategory'])
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['subcategory'] = get_object_or_404(SubCategory, slug=self.kwargs['slug_subcategory'])
        return context


class BrandListView(ListView):
    model = Brand
    context_object_name = 'brands'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


class CompanyProfilePageView(TemplateView):
    template_name = "products/company_profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


class CompanyVisionPageView(TemplateView):
    template_name = "products/company_mission_vision.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


class ContactUsPageView(View):
    template_name = "products/contact_us.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context
