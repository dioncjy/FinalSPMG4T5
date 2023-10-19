import unittest
import pytest
import sys
from flask import Flask
sys.path.append('..')
from backend.staff.staff import getAllRoles, getAllUniqueRoles, getRoleDetails, getRoleSkills, get_staff_skill, getIndividualRoleListing
from backend.main import app
from backend.connectionManager import connect_to_database
import connectionManager

app = Flask(__name__)

# connectionManager = connect_to_database()

class TestFlaskFunctions(unittest.TestCase):
    def setUp(self):
        # Set up the Flask app context for testing
        # app.testing = True
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Matthias159!@database-work.c2bsg3plgld1.us-east-1.rds.amazonaws.com/SPM'
        self.app = app.test_client()
        self.connectionManager = connect_to_database()


    def test_get_all_roles_success(self):
        # Send a GET request to the '/all-roles' endpoint (replace with your actual endpoint)
        # response = self.app.get('http://127.0.0.1:5000/role', headers={"Content-Type": "application/json"})
        response = self.app.get('/role', headers={"Content-Type": "application/json"})
        # response = self.client.get("http://127.0.0.1:5000/role")
        # response = getAllRoles()

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        # data = response.get_json()

        # Check if the response contains the expected keys
        # self.assertTrue(all(key in data[0] for key in ['role_name', 'role_desc']))
        # self.assertEqual(all(key in data[0] for key in ['role_name', 'role_desc']))

if __name__ == "__main__":
    unittest.main()
