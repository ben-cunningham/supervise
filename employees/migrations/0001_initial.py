# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Estimator',
            fields=[
                ('employee_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='employees.Employee')),
                ('avg_estimate', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=('employees.employee',),
        ),
        migrations.CreateModel(
            name='Foreman',
            fields=[
                ('employee_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='employees.Employee')),
                ('avg_profit', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=('employees.employee',),
        ),
        migrations.AddField(
            model_name='employee',
            name='user',
            field=models.OneToOneField(null=True, to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
