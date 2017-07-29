from django.shortcuts import render
from django.http import HttpResponse
from .models import Tool

def index(request):
	obj =  Tool.objects.all().filter(activate=True)
	return render(request, 'project/index.html', {'tools': obj})

# Create your views here.
