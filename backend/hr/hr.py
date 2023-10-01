from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
import sys
import json

app = Flask(__name__)

sys.path.append('..')

from backend.connectionManager import connect_to_database

# Get all staff from staff table
# @app.route('/')
def getAllStaff():
    try:

        connection, cursor = connect_to_database()

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

# get individual staff
def getStaffDetails(staff_id):
    try:

        connection, cursor = connect_to_database()

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
        connection, cursor = connect_to_database()

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
                'closing_date': row[3],
                'opening_date': row[4],
                'hiring_manager': row[5],
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

        connection, cursor = connect_to_database()

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

def insertApplication(staff_id, comments, role_name, listing_id):
    try:
        # Connect to the database
        connection, cursor = connect_to_database()

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
            'closing_date': row1[3],
            'opening_date': row1[4],
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


if __name__ == '__main__':
    app.run(debug=True)
