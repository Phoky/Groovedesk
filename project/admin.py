from django.contrib import admin

from .models import Tool, TypeOfTool, PushFoward, Newsletter
# Register your models here.

class ToolAdmin(admin.ModelAdmin):
	list_display = ('name', 'activate', 'pushFowardBoolean')
	list_filter = ['activate', 'pushFowardBoolean']

class TypeOfToolAdmin(admin.ModelAdmin):
	list_display = ('name', 'canonical', 'codeColor')

admin.site.register(Tool, ToolAdmin)
admin.site.register(TypeOfTool,TypeOfToolAdmin)
admin.site.register(PushFoward)
admin.site.register(Newsletter)


