from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
import sys

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

if __name__ == '__main__':
    app.run(debug=True)
