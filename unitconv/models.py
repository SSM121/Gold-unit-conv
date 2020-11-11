from django.db import models

# Create your models here.
# creates a table with a start type and how many of those start type needed
# to convert to troy oz
class Conversion(models.Model):
    start_type = models.CharField(max_length=10)
    num = models.FloatField()
