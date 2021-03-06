# Generated by Django 2.1.1 on 2018-12-22 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_brand'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='documents/banner')),
            ],
            options={
                'verbose_name_plural': 'banners',
            },
        ),
    ]
