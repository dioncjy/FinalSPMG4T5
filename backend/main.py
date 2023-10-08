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
@app.route('/role_listing', methods=['GET'])
def get_all_role_listings():
    return hr.getAllRoleListings()

# gets all the staff
@app.route('/staff', methods=['GET'])
def get_staff_from_module():
    staff_data = hr.getAllStaff() 
    return staff_data

# gets all the applications
@app.route('/getallapplications', methods=['GET'])
def get_all_applications():
    applications_data = hr.getAllApplications() 
    return applications_data

#get specific applicant from specific role
@app.route('/getspecificapplicant/<role_name>/<applicant_name>', methods=['GET'])
def get_specific_applicant(role_name, applicant_name):
    specific_applicant_data = hr.getSpecificApplicant(role_name, applicant_name)
    return specific_applicant_data

# gets an individual staff and his/her details
@app.route('/staff/<staff_id>', methods=['GET'])
def get_staff_details(staff_id):
    staff_details_data = hr.getStaffDetails(staff_id)
    return staff_details_data

#  gets all role skills details
@app.route('/role_skill', methods=['GET'])
def get_all_role_skills_details():
    role_skills_data = hr.getAllRoleSkills()
    return role_skills_data

# inserts value into application table
@app.route('/insertapplication/<staff_id>&<comments>&<role_name>&<listing_id>', methods=['POST'])
def insert_application(staff_id, comments, role_name, listing_id):
    insert_application_data = hr.insertApplication(staff_id, comments, role_name, listing_id)
    return insert_application_data

#STAFF ENDPOINTS

# gets all roles from the master list
@app.route('/role', methods=['GET'])
def get_roles_from_module():
    roles_data = staff.getAllRoles() 
    return roles_data

# gets all unique roles from the master list
@app.route('/uniquerole', methods=['GET'])
def get_unique_roles_from_module():
    rolesU_data = staff.getAllUniqueRoles() 
    return rolesU_data

# gets an individual role from master details
@app.route('/getroledetails/<role_name>', methods=['GET'])
def get_role_listing_details(role_name):
    role_data = staff.getRoleDetails(role_name)
    return role_data

# gets an individual role listing
@app.route('/getrolelisting/<role_name>&<listing_id>', methods=['GET'])
def get_role_listing(listing_id, role_name):
    role_data = staff.getIndividualRoleListing(listing_id, role_name)
    return role_data

# gets an individual role skills details
@app.route('/role_skill/<role_name>', methods=['GET'])
def get_role_skills_details(role_name):
    role_skills_data = staff.getRoleSkills(role_name)
    return role_skills_data

# Get staff skill
@app.route('/staff_skill/<staff_id>', methods=['GET'])
def get_staff_skill(staff_id):
    staff_skill = staff.get_staff_skill(staff_id)
    return staff_skill

# Get all staff skill
@app.route('/staff_skill', methods=['GET'])
def get_all_staff_skill():
    all_staff_skills = hr.getAllStaffSkills()
    return all_staff_skills

# Auto populate role details
@app.route('/autoRoleDetails/<role_name>', methods=['GET'])
def auto_role_details(role_name):
    auto_role_details = hr.autoPopulateRoleDetails(role_name)
    return auto_role_details

@app.route("/")
def home():
    return "Call the specific routes"

if __name__ == "__main__":
    app.run(debug=True)