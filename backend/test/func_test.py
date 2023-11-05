# import psycopg2
# import requests
import pytest
# from flask import jsonify
import sys
from backend.connectionManager import connect_to_database, connect_to_test_database
from main_test import create_app
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# import logging

sys.path.append('..')

db_host = os.getenv('rds_host')
db_name = os.getenv('rds_name')
db_user = os.getenv('rds_user')
db_password = os.getenv('rds_password')
from datetime import date

BASE_URL = 'http://127.0.0.1:5000'
test_db_name = "test_db"

def compare_lists_of_dicts(list1, list2, key_to_compare):

    sorted_list1 = sorted(list1, key=lambda x: x[key_to_compare])
    sorted_list2 = sorted(list2, key=lambda x: x[key_to_compare])
    return sorted_list1 == sorted_list2


@pytest.fixture(scope="module")
def app():
    connection, cursor = connect_to_database()
    
    connection.autocommit = True
    cursor.execute(f"DROP DATABASE IF EXISTS {test_db_name}")
    cursor.execute(f"CREATE DATABASE {test_db_name}")
    cursor.close()
    connection.autocommit = False
    connection.close()
    
    connection, cursor = connect_to_test_database()
    while connection is None:
        connection, cursor = connect_to_test_database()
        
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

# ----------------------------------------------------------------------
# SKILL
    cursor.execute("""
            CREATE TABLE IF NOT EXISTS skill (
                skill_name varchar(50) PRIMARY KEY,
                skill_desc text
            );
        """)
    cursor.execute("""
        INSERT INTO skill (skill_name, skill_desc)
        VALUES
            ('test skill 1', 'description for test skill 1'),
            ('test skill 2', 'description for test skill 2'),
            ('test skill 3', 'description for test skill 3')
    """)
# ----------------------------------------------------------------------
# ACCESS CONTROL
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS access_control (
            access_id serial PRIMARY KEY,
            access_control_name varchar(20) UNIQUE
        );
    """)
    cursor.execute("""
        INSERT INTO access_control (access_control_name)
        VALUES
            ('test AC 1'),
            ('test AC 2');
    """)
    
# ----------------------------------------------------------------------
# ROLE
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS role (
            role_name varchar(20) UNIQUE NOT NULL,
            role_desc text
        );
    """)
    cursor.execute("""
        INSERT INTO role (role_name, role_desc)
        VALUES
            ('role 1', 'role description 1'),
            ('role 2', 'role description 2');
    """)

# ----------------------------------------------------------------------
# STAFF
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS staff (
            staff_id int PRIMARY KEY,
            staff_fname varchar(50) NOT NULL,
            staff_lname varchar(50) NOT NULL,
            dept varchar(50) NOT NULL,
            email varchar(50) NOT NULL,
            role integer REFERENCES access_control(access_id) NOT NULL
        );
    """)
    cursor.execute("""
        INSERT INTO staff (staff_id, staff_fname, staff_lname, dept, email, role)
        VALUES
            (1, 'john', 'doe', 'hr', 'john@example.com', 1),
            (2, 'jane', 'smith', 'it', 'jane@example.com', 2);
    """)

# ----------------------------------------------------------------------
# ROLE_SKILL
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS role_skill (
            role_name varchar(20) REFERENCES role(role_name),
            skill_name varchar(50) REFERENCES skill(skill_name),
            PRIMARY KEY (role_name, skill_name)
        );
    """)
    cursor.execute("""
        INSERT INTO role_skill (role_name, skill_name)
        VALUES
            ('role 1', 'test skill 1'),
            ('role 1', 'test skill 2'),
            ('role 2', 'test skill 3'),
            ('role 2', 'test skill 1');
    """)
# ----------------------------------------------------------------------
# STAFF_SKILL

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS staff_skill (
            staff_id integer REFERENCES staff(staff_id),
            skill_name varchar(50) REFERENCES skill(skill_name),
            PRIMARY KEY (staff_id, skill_name)
        );
    """)
    cursor.execute("""
        INSERT INTO staff_skill (staff_id, skill_name)
        VALUES
            (1, 'test skill 1'),
            (1, 'test skill 2'),
            (1, 'test skill 3'),
            (2, 'test skill 1'),
            (2, 'test skill 2'),
            (2, 'test skill 3');
    """)
# ----------------------------------------------------------------------
# ROLE_LISTING
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS role_listing (
            listing_id serial4 UNIQUE NOT NULL,
            role_name varchar(50) UNIQUE NOT NULL REFERENCES role(role_name),
            dpt varchar(50) NULL,
            closing_date date NULL,
            opening_date date NULL,
            reporting_manager varchar(50) NULL,
            role_description text NULL,
            CONSTRAINT composite_pk PRIMARY KEY (listing_id, role_name)
        );
    """)
    cursor.execute("""
        INSERT INTO role_listing (role_name, dpt, closing_date, opening_date, reporting_manager, role_description)
        VALUES
            ('role 1', 'hr', '2023-12-12', '2023-11-11', 'Reporting Manager 1', 'role description 1')
    """)

#APPLICATIONS
    cursor.execute("""
        CREATE TABLE public.applications (
            listing_id int4 NOT NULL REFERENCES role_listing(listing_id),   
            role_name varchar(50) NOT NULL REFERENCES role_listing(role_name), 
            staff_id int4 NOT NULL REFERENCES staff(staff_id),
            applicant_name varchar(50) NULL,
            dpt varchar(50) NULL,
            "comments" text NULL,
            CONSTRAINT applications_pk PRIMARY KEY (listing_id, role_name, staff_id)
        );                   
    """)
    cursor.execute("""
        INSERT INTO applications (listing_id, role_name, staff_id, applicant_name, dpt, "comments")
        VALUES
            (1, 'role 1', 1, 'Applicant 1', 'hr', 'Some comments for applicant 1')
    """)
    
    connection.commit()    


    yield app

    connection, cursor = connect_to_database()
    connection.autocommit = True
    cursor.execute(f"DROP DATABASE {test_db_name}")
    cursor.close()
    connection.autocommit = False
    connection.close()
    
        
@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
        
def test_role_listings(client):
    expected_role_listings = [
        {
            "listing_id": 1,
            "role_name": "role 1",
            "department": "hr",
            "closing_date": "2023-12-12",
            "opening_date": "2023-11-11",
            "reporting_manager": "Reporting Manager 1",
            "role_description": "role description 1"
        }
    ]

    response = client.get(f'{BASE_URL}/role_listing')
    data = response.json
    
    assert response.status_code == 200
    assert set(expected_role_listings[0].keys()) == set(data[0].keys())
    
    common_keys = set(expected_role_listings[0].keys())

    for item1, item2 in zip(data, expected_role_listings):
        for key in common_keys:
            assert item1[key] == item2[key]
            
    
def test_staff(client):
    expected_staff = [
        {
            "staff_id": 1,
            "staff_fname": "john",
            "staff_lname": "doe",
            "dept": "hr",
            "email": "john@example.com",
            "role": 1
        },
        {
            "staff_id": 2,
            "staff_fname": "jane",
            "staff_lname": "smith",
            "dept": "it",
            "email": "jane@example.com",
            "role": 2
        }
    ]

    response = client.get(f'{BASE_URL}/staff') 
    data = response.json
    
    assert response.status_code == 200
    assert set(expected_staff[0].keys()) == set(data[0].keys())
    
    common_keys = set(expected_staff[0].keys())

    for item1, item2 in zip(data, expected_staff):
        for key in common_keys:
            assert item1[key] == item2[key]
            

def test_getallapplications(client):
    expected_applications = [
        {
            "listing_id": 1,
            "role_name": "role 1",
            "staff_id": 1,
            "applicant_name": "Applicant 1",
            "dpt": "hr",
            "comments": "Some comments for applicant 1"
        }
    ]

    response = client.get(f'{BASE_URL}/getallapplications') 
    data = response.json

    assert response.status_code == 200
    assert set(expected_applications[0].keys()) == set(data[0].keys())

    common_keys = set(expected_applications[0].keys())

    for item1, item2 in zip(data, expected_applications):
        for key in common_keys:
            assert item1[key] == item2[key]

    
def test_getapplicantsbylisting(client):
    listing_id = 1 
    expected_applicants = [
        {
            "listing_id": 1,
            "role_name": "role 1",
            "staff_id": 1,
            "applicant_name": "Applicant 1",
            "dpt": "hr",
            "comments": "Some comments for applicant 1"
        },

    ]

    response = client.get(f'{BASE_URL}/getapplicantsbylisting/{listing_id}') 
    data = response.json

    assert response.status_code == 200
    assert set(expected_applicants[0].keys()) == set(data[0].keys())

    common_keys = set(expected_applicants[0].keys())

    for item1, item2 in zip(data, expected_applicants):
        for key in common_keys:
            assert item1[key] == item2[key]
            
            
def test_getspecificapplicant(client):
    listing_id = 1  
    role_name = "role 1"  
    staff_id = 1  

    expected_applicant = {
        "listing_id": 1,
        "role_name": "role 1",
        "staff_id": 1,
        "applicant_name": "Applicant 1",
        "dpt": "hr",
        "comments": "Some comments for applicant 1"
    }

    response = client.get(f'{BASE_URL}/getspecificapplicant/{listing_id}&{role_name}&{staff_id}')

    data = response.json

    assert response.status_code == 200
    assert set(expected_applicant.keys()) == set(data.keys())

    common_keys = set(expected_applicant.keys())

    for key in common_keys:
        assert data[key] == expected_applicant[key]
        
        
def test_get_staff_details(client):
    staff_id = 1
    expected_staff_details = {
        "staff_id": 1,
        "staff_fname": "john",
        "staff_lname": "doe",
        "dept": "hr",
        "email": "john@example.com",
        "role": 1
    }

    response = client.get(f'{BASE_URL}/staff/{staff_id}')
    data = response.json

    assert response.status_code == 200
    assert set(expected_staff_details.keys()) == set(data.keys())

    common_keys = set(expected_staff_details.keys())

    for key in common_keys:
        assert data[key] == expected_staff_details[key]
        

def test_role_skills(client):
    expected_role_skills = [
        {
            "role_name": "role 1",
            "skill_name": ["test skill 1", "test skill 2"]
        },
        {
            "role_name": "role 2",
            "skill_name": ["test skill 1", "test skill 3"]
        }
    ]

    response = client.get(f'{BASE_URL}/role_skill')
    data = response.json

    assert response.status_code == 200
    assert len(data) == len(expected_role_skills)
    
    expected_set = {(d["role_name"], tuple(sorted(d["skill_name"]))) for d in expected_role_skills}
    response_set = {(d["role_name"], tuple(sorted(d["skill_name"]))) for d in data}

    assert expected_set == response_set

def test_insert_application(client):
    staff_id = 2
    comments = "Test application comments"
    role_name = "role 1"
    listing_id = 1

    expected_response = {'message': 'Application added successfully'}
    response = client.post(f'{BASE_URL}/insertapplication/{staff_id}&{comments}&{role_name}&{listing_id}')

    assert response.status_code == 200
    assert response.json == expected_response

    connection, cursor = connect_to_test_database()

    cursor.execute("""
        SELECT * FROM applications
        WHERE listing_id = %s AND staff_id = %s AND role_name = %s
    """, (listing_id, staff_id, role_name))

    database_data = cursor.fetchone()
    
    expected_data = {
        'listing_id': 1,
        'role_name': 'role 1',
        'staff_id': 2,
        'applicant_name': 'jane smith',
        'dpt': 'it',
        'comments': 'Test application comments'
    }

    cursor.close()
    connection.close()
    
    assert database_data is not None
    
    listing_id = database_data[0]  
    role_name = database_data[1]   
    staff_id = database_data[2]     
    applicant_name = database_data[3]
    dpt = database_data[4]
    comments = database_data[5]

    # Then, you can compare the values
    assert listing_id == expected_data['listing_id']
    assert role_name == expected_data['role_name']
    assert staff_id == expected_data['staff_id']
    assert applicant_name == expected_data['applicant_name']
    assert dpt == expected_data['dpt']
    assert comments == expected_data['comments']


def test_addRole(client):
    role_name = "role 2"
    dpt = "it"
    closing_date = "2023-10-30"
    opening_date = "2023-10-11"
    reporting_manager = "Reporting Manager 2"

    expected_response = {'message': 'Role listing added successfully'}

    response = client.post(f'{BASE_URL}/addrole/{role_name}&{dpt}&{closing_date}&{opening_date}&{reporting_manager}')

    assert response.status_code == 200
    assert response.json == expected_response

    connection, cursor = connect_to_test_database()
    
    cursor.execute("SELECT * FROM role_listing WHERE role_name = %s", (role_name,))
    database_data = cursor.fetchone()
    cursor.close()
    connection.close()

    expected_data = {  
        'listing_id': 2,
        'role_name': role_name,
        'dpt': dpt,
        'closing_date': closing_date,
        'opening_date': opening_date,
        'reporting_manager': reporting_manager,
        'role_description': 'role description 2'
    }
    
    assert database_data is not None
    
    listing_id = database_data[0]
    role_name = database_data[1]
    dpt = database_data[2]
   
    closing_date = database_data[3]
    closing_date_string = closing_date.strftime('%Y-%m-%d')

    opening_date = database_data[4]
    opening_date_string = opening_date.strftime('%Y-%m-%d')
        
    
    reporting_manager = database_data[5]
    role_description = database_data[6]
    
    assert expected_data['listing_id'] == listing_id
    assert expected_data['role_name'] == role_name
    assert expected_data['dpt'] == dpt
    assert expected_data['closing_date'] == closing_date_string
    assert expected_data['opening_date'] == opening_date_string
    assert expected_data['reporting_manager'] == reporting_manager
    assert expected_data['role_description'] == role_description
    
    connection, cursor = connect_to_test_database()
    cursor.execute("DELETE FROM role_listing WHERE role_name = %s", (role_name,))
    cursor.close()
    connection.close()
    
    
def test_get_all_staff_skill(client):
    response = client.get(f'{BASE_URL}/staff_skill')
    data = response.json

    assert response.status_code == 200  


    expected_data = [
        {
            'staff_id': 1,
            'staff_skill': ['test skill 1', 'test skill 2', 'test skill 3']
        },
        {
            'staff_id': 2,
            'staff_skill': ['test skill 1', 'test skill 2', 'test skill 3']
        }

    ]

    assert len(data) == len(expected_data) 
    sorted_data = sorted(data, key=lambda x: x['staff_id'])

    for actual, expected in zip(sorted_data, expected_data):
        assert actual['staff_id'] == expected['staff_id']
        assert sorted(actual['staff_skill']) == sorted(expected['staff_skill'])


def test_auto_role_details(client):
    role_name = 'role 1'  

    response = client.get(f'{BASE_URL}/autoRoleDetails/{role_name}')
    data = response.json

    assert response.status_code == 200  

    
    expected_data =  {
            'role_name': 'role 1',
            'role_desc': 'role description 1',
            'role_skill': ['test skill 1', 'test skill 2']
        }
    

    assert len(data) == 1

    actual_role_name = data[0]['role_desc']
    actual_role_description = data[0]['role_name']
    actual_role_skill = data[0]['role_skill']
    
    expected_data['role_name'] = actual_role_name
    expected_data['role_desc'] = actual_role_description
    expected_data['role_skill'] = actual_role_skill


# SEAN LONGSTAFF

def test_getAllRoles(client):
    expected_roles = [
        {
            'role_name': 'role 1',
            'role_desc': 'role description 1'
        },
        {
            'role_name': 'role 2',
            'role_desc': 'role description 2'
        }
    ]

    response = client.get(f'{BASE_URL}/role')
    data = response.json

    assert response.status_code == 200
    assert len(data) == len(expected_roles)

    for actual_role, expected_role in zip(data, expected_roles):
        assert actual_role['role_name'] == expected_role['role_name']
        assert actual_role['role_desc'] == expected_role['role_desc']

    
    
def test_getAllUniqueRoles(client):
    expected_unique_roles = [
        {'role_name': 'role 1'},
        {'role_name': 'role 2'}
    ]

    response = client.get(f'{BASE_URL}/uniquerole')
    data = response.json

    assert response.status_code == 200

    assert len(data) == len(expected_unique_roles)

    for actual_unique_role, expected_unique_role in zip(data, expected_unique_roles):
        assert actual_unique_role['role_name'] == expected_unique_role['role_name']

    
def test_getRoleListingDetails(client):
    role_name = 'role 1'  

    expected_role_details = {
        'role_name': 'role 1',
        'role_desc': 'role description 1'

    }
    response = client.get(f'{BASE_URL}/getroledetails/{role_name}')
    data = response.json

    assert response.status_code == 200

    assert data == expected_role_details
    
    
def test_getRoleListing(client):
    role_name = 'role 1'
    listing_id = 1  

    expected_role_listing = {
        'listing_id': 1,
        'role_name': 'role 1',
        'department': 'hr',
        'closing_date': '2023-12-12',
        'opening_date': '2023-11-11',
        'reporting_manager': 'Reporting Manager 1',
        'role_description': 'role description 1'
    }

    response = client.get(f'{BASE_URL}/getrolelisting/{role_name}&{listing_id}')
    data = response.json
    
    print(data)

    assert response.status_code == 200
    assert data == expected_role_listing
    
    
def test_getRoleSkillDetails(client):
    role_name = 'role 1'
    expected_response = {
        'role_name': 'role 1',
        'skill_name': ['test skill 1', 'test skill 2']
    }

    response = client.get(f'{BASE_URL}/role_skill/{role_name}')

    assert response.status_code == 200
    assert response.json == expected_response


def test_getStaffSkill(client):
    staff_id = 1

    expected_response = {
        'staff_id': staff_id,
        'staff_skill': ['test skill 1', 'test skill 2', 'test skill 3']
    }

    response = client.get(f'{BASE_URL}/staff_skill/{staff_id}')

    assert response.status_code == 200
    assert response.json == expected_response

    
def test_nopath(client):
    response = client.get(f'{BASE_URL}/')
    data = response.data.decode('utf-8')  # Decode the response content
    assert response.status_code == 200
    assert data == 'Call the specific routes'
    
    
if __name__ == '__main__':
    pytest.main()
    
    
