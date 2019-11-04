import unittest
import sqlite3
import contextlib
import os
from Application.database import *

class TestDatabaseMethods(unittest.TestCase):

    def test_a_connect_to_db(self):
        os.remove('user_data.db') # remove existing database
        connect_to_db() # create missing tables
        connection = sqlite3.connect('user_data.db')
        cursor = connection.cursor()
        cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='users'") # check if users table exists
        self.assertEqual(cursor.fetchone()[0], 1) # pass if users table exists

    def test_b_hash(self):
        self.assertEqual(hash_password("Password321","h@28%*fk4(37#3&2^($"), "83556aeac09444e2ee21d4cd6a72a5342de6dc31a326c3f8430de83e56558588f1fc09c4a233df959e2c89e8ad26f3d8800f5337c3a3684ac9b0117dfb6336ea")

    def test_c_register_user(self):
        self.assertEqual(register_user("admin", "budgetplannerswe@gmail.com", "password1", "password1"), "registration successful")

        self.assertEqual(register_user("admin", "budgetplannerswe@gmail.com", "password1", "password1"), "username is already in use")

        self.assertEqual(register_user("admin2", "budgetplannerswe@gmail.com", "password1", "password2"), "password doesn't match confirmation password")

        self.assertEqual(register_user("admin2", "invalid", "password1", "password1"), "registration successful, email failed to send")

    def test_d_login(self):
        self.assertEqual(login("admin", "password1"), "login successful")

        self.assertEqual(login("admin3", "password1"), "user does not exist")

        self.assertEqual(login("admin2", "password2"), "incorrect password")

        self.assertEqual(login("admin2", "password1"), "login successful")
# only run the tests if directly execute, eg. not imported by another file
if __name__ == '__main__':
    unittest.main()
