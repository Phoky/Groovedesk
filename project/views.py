from django.shortcuts import render
from django.http import HttpResponse
from .models import Tool, TypeOfTool, Newsletter
import json
from django.core import serializers

def index(request):
	tools = Tool.objects.all().filter(activate=True)
	types = TypeOfTool.objects.all()
	return render(request, 'project/index.html', {'tools': tools, 'types': types})

def search(request):
	if request.method == 'POST':
		typeId = request.POST.get('typeId')
		tools = list(Tool.objects.all().filter(typeOfTool__id=typeId))
		data = serializers.serialize("json", tools)
		return HttpResponse(
			json.dumps(data),
			content_type="application/json"
		)


def registerNewsletter(request):
	if request.method == 'POST':
		email = request.POST.get('email')
		response = {}
		if email == '':
			response['status'] = 'wrong'
			response['message'] = 'Email null'
		else:
			obj = Newsletter.objects.all().filter(email=email)
			if (len(obj) == 0):
				register = Newsletter(email=email)
				register.save()
				response['status'] = 'success'
				response['message'] = 'Register validate'
			else:
				response['status'] = 'wrong'
				response['message'] = 'User register'
		return HttpResponse(json.dumps(response),content_type="application/json")



# Create your views here.
