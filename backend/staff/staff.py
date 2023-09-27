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

        cursor.execute('SELECT * FROM role_skill WHERE role_name = %s', (role_name,))


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

if __name__ == '__main__':
    app.run(debug=True)
