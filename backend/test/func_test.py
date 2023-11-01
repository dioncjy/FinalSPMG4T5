# import psycopg2
# import requests
import pytest
# from flask import jsonify
from backend.connectionManager import connect_to_database, connect_to_test_database
from main_test import create_app
# import logging

BASE_URL = 'http://127.0.0.1:5000'
test_db_name = "test_db"

def compare_lists_of_dicts(list1, list2, key_to_compare):

    sorted_list1 = sorted(list1, key=lambda x: x[key_to_compare])
    sorted_list2 = sorted(list2, key=lambda x: x[key_to_compare])
    return sorted_list1 == sorted_list2



@pytest.fixture()
def app():
    connection, cursor = connect_to_database()
    
    connection.autocommit = True
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
            country varchar(50) NOT NULL,
            email varchar(50) NOT NULL,
            role integer REFERENCES access_control(access_id) NOT NULL
        );
    """)
    cursor.execute("""
        INSERT INTO staff (staff_id, staff_fname, staff_lname, dept, country, email, role)
        VALUES
            (1, 'john', 'doe', 'hr', 'usa', 'john@example.com', 1),
            (2, 'jane', 'smith', 'it', 'canada', 'jane@example.com', 2);
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
            listing_id serial4 NOT NULL,
            role_name varchar(50) NOT NULL REFERENCES role(role_name),
            dpt varchar(50) NULL,
            closing_date date NULL,
            opening_date date NULL,
            reporting_manager varchar(50) NULL,
            role_description text NULL,
            CONSTRAINT composite_pk PRIMARY KEY (listing_id, role_name)
        );
    """)
    cursor.execute("""
        INSERT INTO role_listing (listing_id, role_name, dpt, closing_date, opening_date, reporting_manager, role_description)
        VALUES
            (1, 'role 1', 'hr', '2023-12-12', '2023-11-11', 'Reporting Manager 1', 'role description 1'),
            (2, 'role 2', 'it', '2023-10-30', '2023-10-11', 'Reporting Manager 2','role description 2');
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
        
def test_getAllRoleListings(client):
    expected_role_listings = [
        {
            "listing_id": 1,
            "role_name": "role 1",
            "department": "hr",
            "closing_date": "2023-12-12",
            "opening_date": "2023-11-11",
            "reporting_manager": "Reporting Manager 1",
            "role_description": "role description 1"
        },
        {
            "listing_id": 2,
            "role_name": "role 2",
            "department": "it",
            "closing_date": "2023-10-30",
            "opening_date": "2023-10-11",
            "reporting_manager": "Reporting Manager 2",
            "role_description": "role description 2"
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

        
if __name__ == '__main__':
    pytest.main()