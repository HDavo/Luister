# Generated by Django 4.2.1 on 2023-06-04 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customlistTrack', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customlisttrack',
            name='includedon',
            field=models.DateTimeField(null=True),
        ),
    ]