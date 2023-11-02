from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
import sys
import json

app = Flask(__name__)

sys.path.append('..')

from backend.connectionManager import connect_to_test_database

# Get all staff from staff table
# @app.route('/')
def getAllStaff():
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM staff')
        # cursor.execute("SELECT * FROM staff WHERE staff_fname = 'Rajesh'")

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'staff_id': row[0],
                'staff_fname': row[1],
                'staff_lname': row[2],
                'dept': row[3],
                'email': row[4],
                'role': row[5]
                # Add more columns as needed
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def getAllStaffSkills():
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # cursor.execute('SELECT * FROM staff_skill GROUP BY "staff_skill"')
        cursor.execute('select staff_id, array_agg(skill_name) as skill_name_list from staff_skill group by staff_id')
        # cursor.execute("SELECT * FROM staff WHERE staff_fname = 'Rajesh'")

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'staff_id': row[0],
                'staff_skill': row[1]
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def getAllRoleSkills():
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # cursor.execute('SELECT * FROM role_skill')
        cursor.execute('select role_name, array_agg(skill_name) as skill_name_list from role_skill group by role_name')

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'role_name': row[0],
                'skill_name': row[1]
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def autoPopulateRoleDetails(role_name):
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('select r.role_name, max(r.role_desc), array_agg(s.skill_name) from role_skill s inner join role r on s.role_name = r.role_name where r.role_name = %s group by r.role_name', (role_name,))

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'role_name': row[0],
                'role_desc': row[1],
                'role_skill': row[2]
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# get individual staff
def getStaffDetails(staff_id):
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM staff WHERE staff_id = %s', (staff_id,))


        # Fetch the result. Since we're expecting a single row, we can use fetchone()
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Staff not found'})

        # Convert the row to a dictionary for JSON response
        role_details = {
            'staff_id': row[0],
            'staff_fname': row[1],
            'staff_lname': row[2],
            'dept': row[3],
            'email': row[4],
            'role': row[5]
            # Add more columns as needed
        }

        return jsonify(role_details)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def getAllRoleListings():
    try:
        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM role_listing')

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'listing_id': row[0],
                'role_name': row[1],
                'department': row[2],
                'closing_date': row[3].strftime('%Y-%m-%d'),
                'opening_date': row[4].strftime('%Y-%m-%d'),
                'reporting_manager': row[5],
                'role_description': row[6]
                # Add more columns as needed
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def getAllApplications():
    try:

        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM applications')
        # cursor.execute("SELECT * FROM staff WHERE staff_fname = 'Rajesh'")

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'listing_id': row[0],
                'role_name': row[1],
                'staff_id': row[2],
                'applicant_name': row[3],
                'dpt': row[4],
                'comments': row[5]
                # Add more columns as needed
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

#get all applicants from specific role id
def getApplicantsByListing(listing_id):
    try:
        # Connect to the database
        connection, cursor = connect_to_test_database()

        # Check the connection
        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # Use parameterized query to prevent SQL injection
        cursor.execute('SELECT * FROM applications WHERE listing_id = %s', (listing_id,))

        # Fetch all rows corresponding to the listing_id
        data = cursor.fetchall()

        if not data:
            return jsonify({'error': 'No applicant found for the given listing_id'})

        # Convert the row to a dictionary for JSON response
        result = []
        for row in data:
            result.append({
                'listing_id': row[0],
                'role_name': row[1],
                'staff_id': row[2],
                'applicant_name': row[3],
                'dpt': row[4],
                'comments': row[5]
                # Add more columns as needed
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()


#get specific applicant from specific role
def getSpecificApplicant(listing_id, role_name, staff_id):
    try:
        # Connect to the database
        connection, cursor = connect_to_test_database()

        # Check the connection
        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # Use parameterized query to prevent SQL injection
        cursor.execute(
            # 'SELECT * FROM applications WHERE role_name = %s AND applicant_name = %s', (role_name, applicant_name))
            'SELECT * FROM applications WHERE listing_id = %s AND role_name = %s AND staff_id = %s', (listing_id, role_name, staff_id))

        # Fetch the row corresponding to the criteria
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'No applicant found for the given role and applicant name'})

        # Convert the row to a dictionary for JSON response
        result = {
            'listing_id': row[0],
            'role_name': row[1],
            'staff_id': row[2],
            'applicant_name': row[3],
            'dpt': row[4],
            'comments': row[5]
            # Add more columns if needed
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def insertApplication(staff_id, comments, role_name, listing_id):
    try:
        # Connect to the database
        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # Retrieve staff details
        cursor.execute('SELECT * FROM staff WHERE staff_id = %s', (staff_id,))

        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Staff not found'})

        staff_details = {
            'staff_id': row[0],
            'staff_fname': row[1],
            'staff_lname': row[2],
            'dept': row[3],
            'email': row[4],
            'role': row[5]
        }

        # retrieve role listing
        cursor.execute('SELECT * FROM role_listing WHERE listing_id = %s', (listing_id,))

        row1 = cursor.fetchone()

        if not row1:
            return jsonify({'error': 'Role listing not found'})

        role_details = {
            'listing_id': row1[0],
            'role_name': row1[1],
            'dpt': row1[2],
            'closing_date': row1[3].strftime('%Y-%m-%d'),
            'opening_date': row1[4].strftime('%Y-%m-%d'),
            'reporting_manager': row1[5]
        }

        # specify variables
        applicant_name = f'{staff_details["staff_fname"]} {staff_details["staff_lname"]}'
        dpt = staff_details['dept']
        role_name1 = role_details["role_name"]
        listing_id1 = role_details['listing_id']

        # return(role_details)

        # Insert application into the applications table
        cursor.execute(
            'INSERT INTO applications (listing_id, role_name, staff_id, applicant_name, dpt, comments)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            (listing_id1, role_name1, staff_id, applicant_name, dpt, comments,)
        )

        # Commit the transaction
        connection.commit()

        return jsonify({'message': 'Application added successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def addRole(role_name, dpt, closing_date, opening_date, reporting_manager):
    try:
        # Connect to the database
        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # Retrieve staff details
        cursor.execute('select r.role_name, max(r.role_desc), array_agg(s.skill_name) from role_skill s inner join role r on s.role_name = r.role_name where r.role_name = %s group by r.role_name', (role_name,))

        # Fetch all rows from the query result
        data = cursor.fetchone()

        details = {
            'role_name': data[0],
            'role_desc': data[1],
            'role_skill': data[2]
        }

        role_desc = details['role_desc']


        # Insert application into the applications table
        cursor.execute(
            'INSERT INTO role_listing (role_name, dpt, closing_date, opening_date, reporting_manager, role_description)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            (role_name, dpt, closing_date, opening_date, reporting_manager, role_desc,)
        )
        
        connection.commit()

        return jsonify({'message': 'Role listing added successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def editRole(listing_id, role_name, dpt, closing_date, opening_date, reporting_manager):
    try:
        # Connect to the database
        connection, cursor = connect_to_test_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})
        
        cursor.execute('SELECT * FROM role_listing WHERE role_name = %s and listing_id = %s', (role_name, listing_id,))


        # Fetch the result. Since we're expecting a single row, we can use fetchone()
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Role listing not found'})

        # Convert the row to a dictionary for JSON response
        role_details = {
            'listing_id': row[0],
            'role_name': row[1],
            'department': row[2],
            'closing_date': row[3].strftime('%Y-%m-%d'),
            'opening_date': row[4].strftime('%Y-%m-%d'),
            'reporting_manager': row[5],
            'role_description': row[6]
            # Add more columns as needed
        }


        # Insert application into the applications table
        cursor.execute(
            'UPDATE role_listing SET dpt = %s, reporting_manager = %s, opening_date = %s, closing_date = %s WHERE listing_id = %s AND role_name = %s',
            (dpt, reporting_manager, opening_date, closing_date, listing_id, role_name)
        )
        
        connection.commit()

        return jsonify({'message': 'Role listing updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
