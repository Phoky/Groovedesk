# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-07-29 15:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Tools',
            new_name='Tool',
        ),
    ]
