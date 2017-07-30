from django.db import models
# Create your models here.

class TypeOfTool(models.Model):
	name = models.CharField(max_length=200)
	canonical = models.CharField(max_length=200)
	codeColor = models.CharField(max_length=7)
	def __str__(self):
		return self.name

class PushFoward(models.Model):
	name = models.CharField(max_length=200)
	def __str__(self):
		return self.name

class Tool(models.Model):
	name = models.CharField(max_length=100)
	text = models.CharField(max_length=5000)
	shorText = models.CharField(max_length=500)
	picturs = models.ImageField()
	typeOfTool = models.ManyToManyField(TypeOfTool)
	activate = models.BooleanField(default=False)
	pushFowardBoolean = models.BooleanField(default=False)
	pushFoward = models.ForeignKey(PushFoward, on_delete=models.CASCADE, null=True, blank=True, default = None)
	def __str__(self):
		return self.name

class Newsletter(models.Model):
	email = models.EmailField()
	accepted = models.BooleanField(default=True)
	def __str__(self):
		return self.email

		