from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
from hr import hr
from staff import staff

app = Flask(__name__)


@app.route('/role_listings/all', methods=['GET'])
def get_all_role_listings():
    return hr.getAllRoleListings()

@app.route('/getallstaff', methods=['GET'])
def get_staff_from_module():
    staff_data = hr.getAllStaff() 
    return staff_data

@app.route('/getallroles', methods=['GET'])
def get_roles_from_module():
    roles_data = staff.getAllRoles() 
    return roles_data

@app.route("/")
def home():
    return "Call the specific routes"

if __name__ == "__main__":
    app.run(debug=True)