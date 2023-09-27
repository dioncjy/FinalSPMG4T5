from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
from hr import hr
from staff import staff


app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# HR ENDPOINTS

# gets all the role listings
@app.route('/getallrolelistings', methods=['GET'])
def get_all_role_listings():
    return hr.getAllRoleListings()

# gets all the staff
@app.route('/getallstaff', methods=['GET'])
def get_staff_from_module():
    staff_data = hr.getAllStaff() 
    return staff_data

# gets an individual staff and his/her details
@app.route('/getstaffdetails/<staff_id>', methods=['GET'])
def get_staff_details(staff_id):
    staff_details_data = hr.getStaffDetails(staff_id)
    return staff_details_data

#STAFF ENDPOINTS

# gets all roles from the master list
@app.route('/getallroles', methods=['GET'])
def get_roles_from_module():
    roles_data = staff.getAllRoles() 
    return roles_data

# gets an individual role listing details
@app.route('/getroledetails/<role_name>', methods=['GET'])
def get_role_listing_details(role_name):
    role_data = staff.getRoleDetails(role_name)
    return role_data

# gets an individual role skills details
@app.route('/getroleskills/<role_name>', methods=['GET'])
def get_role_skills_details(role_name):
    role_skills_data = staff.getRoleSkills(role_name)
    return role_skills_data

@app.route("/")
def home():
    return "Call the specific routes"

if __name__ == "__main__":
    app.run(debug=True)