# from Application import views
from django.shortcuts import render_to_response, render, redirect
from django.template import RequestContext
from django.template.loader import get_template
import Application.database

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
    return render(request, 'login.html', {'login': 'username'})

def login_user(request):
    # perform the login and redirect to the correct page
    if request.method != 'POST':
        return redirect('/login')
    variables = request.POST
    fields = ['username', 'password']
    if all(field in variables for field in fields): 
        print(variables)
        
        return redirect('/')
    else:
        return render(request, 'login.html', {'error': 'fill in all the fields'})

def register(request):
    return render(request, 'register.html', {'signup': 'username'})

def register_user(request):
    # perform the registration and redirect to the correct page
    if request.method != 'POST':
        return redirect('/register')
    variables = request.POST
    fields = ['username', 'password', 'password_confirm', 'email']
    if all(field in variables for field in fields): 
        print(variables)
        result = Application.database.register_user(variables['username'], variables['email'], variables['password'], variables['password_confirm'])
        print(result)
        return redirect('/')
    else:
        return render(request, 'register.html', {'error': 'fill in all the fields'})

def budget(request):
    return render(request, 'budget.html', {})
	
def spending(request):
    return render(request, 'spending.html', {})
	
def reports(request):
    return render(request, 'reports.html', {})
	
def profile(request):
    return render(request, 'profile.html', {})