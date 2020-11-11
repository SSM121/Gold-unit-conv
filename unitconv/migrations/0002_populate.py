from django.db import migrations



def populate_db(apps, schema_editor):
    Conversion = apps.get_model('unitconv', 'Conversion')
    T = Conversion(start_type="T", num = 32666.7)
    g = Conversion(start_type="g", num = 0.0321507)
    t_oz = Conversion(start_type="t_oz", num = 1)
    kg = Conversion(start_type="kg", num = 32.1507)
    lb = Conversion(start_type="lb", num = 14.5833)
    oz = Conversion(start_type="oz", num = 0.911458)
    T.save()
    g.save()
    t_oz.save()
    kg.save()
    lb.save()
    oz.save()


class Migration(migrations.Migration):

    dependencies = [
        ('unitconv', '0001_initial'),
    ]

    operations = [
            migrations.RunPython(populate_db)
    ]
