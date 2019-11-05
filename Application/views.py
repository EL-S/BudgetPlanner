# from Application import views
from django.shortcuts import render_to_response, render, redirect
from django.template import RequestContext
from django.template.loader import get_template
import Application.database

def index(request):
    if Application.database.check_login(request):
        return render(request, 'budget.html', {'title': 'My Plan'})
    else:
        return render(request, 'index.html', {})

def some_path(request):
    # this is a comment, if you want a link to this file/function, add it to the urls.py file in the BudgetPlanner directory
    return render(request, 'template_name.html', {'the_variable_name': 'the variable value'})

# login page
def login(request): 
    # this is a comment, if you want a link to this file/function, add it to the urls.py file in the BudgetPlanner directory
    if Application.database.check_login(request):
        return render(request, 'budget.html', {'title': 'My Plan'})
    else:
        return render(request, 'login.html', {'login': 'username'})

def login_redirect(request, message):
    return render(request, 'login.html', {'login': 'username', 'message': message})

#updates database when added from budget page
def update_database(request):
    # perform the login and redirect to the correct page
    if request.method != 'POST':
        return redirect('/budget')
    variables = request.POST
    fields = ['bname', 'pvalue', 'type']
    if all(field in variables for field in fields): # if the user filled in all the fields
        print(variables)
        Application.database.add_planned_item(variables['bname'], variables['type'], variables['pvalue'], request.COOKIES.get('username'))
    return redirect('/budget')

#deletes a row from table
def del_item(request):
    # perform the login and redirect to the correct page
    if request.method != 'POST':
        return redirect('/budget')
    variables = request.POST
    fields = ['rowNum']
    if all(field in variables for field in fields): # if the user filled in all the fields
        print(variables)
        Application.database.delete_row(variables['rowNum'], request.COOKIES.get('username'))
    return redirect('/budget')

# processes login post request
def login_user(request):
    # perform the login and redirect to the correct page
    if request.method != 'POST':
        return redirect('/login')
    variables = request.POST
    fields = ['username', 'password']
    if all(field in variables for field in fields): # if the user filled in all the fields
        print(variables)
        result = Application.database.login(variables['username'], variables['password'])
        print(result)
        if result == "login successful":
            response = redirect('/budget')
            response.set_cookie("username", variables['username'])
            response.set_cookie("password", variables['password'])
            return response
        else:
            return render(request, 'login.html', {'error': result})
    else:
        return render(request, 'login.html', {'error': 'fill in all the fields'})

# register page
def register(request):
    return render(request, 'register.html', {'signup': 'username'})

# processes register post request
def register_user(request):
    # perform the registration and redirect to the correct page
    if request.method != 'POST':
        return redirect('/register')
    variables = request.POST
    fields = ['username', 'password', 'password_confirm', 'email']
    if all(field in variables for field in fields): # if the user filled in all the fields
        print(variables)
        result = Application.database.register_user(variables['username'], variables['email'], variables['password'], variables['password_confirm'])
        print(result)
        if "successful" in result:
            return render(request, 'index.html', {'result': result})
        else:
            return render(request, 'register.html', {'error': result})
    else:
        return render(request, 'register.html', {'error': 'fill in all the fields'})

def budget(request):
    if Application.database.check_login(request):
        #Application.database.add_planned_item("test", "Income", "3", "admin4")
        return render(request, 'budget.html', {'title': 'My Plan', 'username': request.COOKIES.get('username'), 'data': Application.database.get_rows(request.COOKIES.get('username'))})
    else:
        return login_redirect(request, 'Please login to view this page')
	
def spending(request):
    if Application.database.check_login(request):
        return render(request, 'spending.html', {'title': 'Actual Spending', 'username': request.COOKIES.get('username')})
    else:
        return login_redirect(request, 'Please login to view this page')
	
def reports(request):
    if Application.database.check_login(request):
        return render(request, 'reports.html', {'title': 'Reports', 'username': request.COOKIES.get('username')})
    else:
        return login_redirect(request, 'Please login to view this page')
	
def profile(request):
    if Application.database.check_login(request):
        return render(request, 'profile.html', {'title': 'Profile', 'username': request.COOKIES.get('username')})
    else:
        return login_redirect(request, 'Please login to view this page')
