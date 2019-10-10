# from Application import views
from django.shortcuts import render_to_response, render
from django.template import RequestContext
from django.template.loader import get_template

def index(request):
    if request.method == 'GET':
        variables = request.GET
    elif request.method == 'POST':
        variables = request.POST
    return render(request, 'index.html', {'cookies': request.COOKIES, 'files': request.FILES, 'variables': variables, 'request_type': request.method, 'headers': request.headers})

def some_path(request):
    # this is a comment, if you want a link to this file/function, add it to the urls.py file in the BudgetPlanner directory
    return render(request, 'template_name.html', {'the_variable_name': 'the variable value'})


def login(request):
    # this is a comment, if you want a link to this file/function, add it to the urls.py file in the BudgetPlanner directory
    return render(request, 'login.html', {'login': 'usename'})
