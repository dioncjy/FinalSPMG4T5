from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
import sys

app = Flask(__name__)

sys.path.append('..')

from backend.connectionManager import connect_to_database

# Get all roles from role table
def getAllRoles():
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM role')

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'role_name': row[0],
                'role_desc': row[1]
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

# Show all unique roles
def getAllUniqueRoles():
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        # cursor.execute('SELECT * FROM role GROUP BY "role_name"')
        cursor.execute('SELECT distinct role_name from role')

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'role_name': row[0]
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

# get specific role name and desc
def getRoleDetails(role_name):
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM role WHERE role_name = %s', (role_name,))


        # Fetch the result. Since we're expecting a single row, we can use fetchone()
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Role not found'})

        # Convert the row to a dictionary for JSON response
        role_details = {
            'role_name': row[0],
            'role_desc': row[1],
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

# get skills from a specific role
def getRoleSkills(role_name):
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('select role_name, array_agg(skill_name) from role_skill where role_name  = %s group by role_name ;', (role_name,))


        # Fetch the result. Since we're expecting a single row, we can use fetchone()
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Role skill not found'})

        # Convert the row to a dictionary for JSON response
        role_details = {
            'role_name': row[0],
            'skill_name': row[1],
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
            
def get_staff_skill(staff_id):
    try:
        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('select staff_id , array_agg(skill_name) from staff_skill where staff_id = %s group by staff_id ;', (staff_id,))
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Staff skill not found'})

        # Convert the row to a dictionary for JSON response
        staff_skill = {
            'staff_id': row[0],
            'staff_skill': row[1],
        }

        return jsonify(staff_skill)

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# get individual role listing
def getIndividualRoleListing(listing_id, role_name):
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM role_listing WHERE role_name = %s and listing_id = %s', (role_name, listing_id,))


        # Fetch the result. Since we're expecting a single row, we can use fetchone()
        row = cursor.fetchone()

        if not row:
            return jsonify({'error': 'Role skill not found'})

        # Convert the row to a dictionary for JSON response
        role_details = {
            'listing_id': row[0],
            'role_name': row[1],
            'department': row[2],
            'closing_date': row[3],
            'opening_date': row[4],
            'reporting_manager': row[5],
            'role_description': row[6]
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

if __name__ == '__main__':
    app.run(debug=True)
