from django.contrib import admin

from .models import Tool, TypeOfTool, PushFoward, Newsletter
# Register your models here.

class ToolAdmin(admin.ModelAdmin):
	list_display = ('name', 'activate')
	list_filter = ['activate']

admin.site.register(Tool, ToolAdmin)
admin.site.register(TypeOfTool)
admin.site.register(PushFoward)
admin.site.register(Newsletter)


