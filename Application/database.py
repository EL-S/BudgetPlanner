import sqlite3
import hashlib
from random import randint
from base64 import b64encode
from os import urandom
from Application.send_email import *
from Application.config import settings

admin_email = settings['email']
admin_password = settings['email_password']

def connect_to_db():
    connection = sqlite3.connect('user_data.db')
    cursor = connection.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                   (user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     username varchar(32) NOT NULL,
                     password varchar(128) NOT NULL,
                     salt varchar(128) NOT NULL,
                     confirmation varchar(128) NOT NULL,
                     email varchar(128) NOT NULL,
                     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS planned_budget
                    (budget_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name varchar(32) NOT NULL,
                     type varchar(32) NOT NULL,
                     value float NOT NULL,
                     user_id integer NOT NULL,
                     FOREIGN KEY(user_id) REFERENCES users(user_id));''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS spending
                    (spending_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     value varchar(32) NOT NULL,
                     budget_item_id integer NOT NULL,
                     FOREIGN KEY(budget_item_id) REFERENCES planned_budget(budget_item_id));''')    
    return connection,cursor
    
def check_login(request):
    username = request.COOKIES.get('username')
    password = request.COOKIES.get('password')

    if username is None or password is None:
        return False
    else:
        if 'successful' in login(username, password):
            return True
        else:
            return False


def login(username, password):
    connection,cursor = connect_to_db()
    cursor.execute("SELECT password,salt FROM users WHERE username=?", [username])
    rows = cursor.fetchall()

    if not rows:
        return "user does not exist"

    try:
        hashed_password = rows[0][0]
        salt = rows[0][1]
        
        hashed_password_attempt = hash_password(password,salt)

        if hashed_password == hashed_password_attempt:
            #create cookie and redirect to secure pages
            #request.session['username'] = username
            return "login successful"
        else:
            return "incorrect password"
    except:
        return "error logging in"
        

def register_user(username, email, password, password_confirm):
    salt = b64encode(urandom(96)).decode("utf-8")
    hashed_password = hash_password(password, salt)
    connection,cursor = connect_to_db()
    confirmation_code = b64encode(urandom(12)).decode("utf-8").replace("=","a").replace("+","b").replace("/","c")
    confirmation_link = settings['web_address']+"/confirm_email?cc="+confirmation_code+"&user="+username
    name_taken = bool(cursor.execute("SELECT username FROM users WHERE username=?", [username]).fetchall())
    
    if not name_taken: # username is not already taken
        if password != password_confirm:
            return "password doesn't match confirmation password"
        cursor.execute("INSERT INTO users(username, password, salt, confirmation, email) VALUES (?,?,?,?,?)",[username,hashed_password,salt,confirmation_code,email])
        connection.commit()
        connection.close()
            
        email_status = send_email(admin_email,admin_password,email,"Confirmation Email",confirmation_link)
        
        if email_status:
            return "registration successful"
        else:
            return "registration successful, email failed to send"
    else:
        return "username is already in use"

def hash_password(password,salt):
    salted_str = (password+salt).encode("utf-8")
    hashGen = hashlib.sha512()
    hashGen.update(salted_str)
    hashed_password = hashGen.hexdigest()
    return hashed_password
