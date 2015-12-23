# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
        ('employees', '0002_estimator_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estimator',
            name='team',
        ),
        migrations.AddField(
            model_name='employee',
            name='team',
            field=models.ForeignKey(related_name='estimators', to='main.Team', null=True),
            preserve_default=True,
        ),
    ]
