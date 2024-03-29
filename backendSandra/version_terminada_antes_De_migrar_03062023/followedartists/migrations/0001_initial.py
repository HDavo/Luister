# Generated by Django 4.2.1 on 2023-06-03 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FollowedArtist',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=200, null=True, verbose_name='Nombre')),
                ('follower', models.IntegerField()),
                ('lookupkey', models.TextField(max_length=400, verbose_name='Lookupkey')),
                ('followedon', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(null=True, upload_to='api')),
            ],
        ),
    ]
