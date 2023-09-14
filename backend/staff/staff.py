from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os
import sys

app = Flask(__name__)

sys.path.append('..')

from backend.connectionManager import connect_to_database

# Get all roles from role_skill
# @app.route()
def getAllRoles():
    try:

        connection, cursor = connect_to_database()

        if connection is None or cursor is None:
            return jsonify({'error': 'Database connection error'})

        cursor.execute('SELECT * FROM role_skill')

        # Fetch all rows from the query result
        data = cursor.fetchall()

        # Convert the data to a list of dictionaries for JSON response
        result = []
        for row in data:
            result.append({
                'role_name': row[0],
                'skill_name': row[1],
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
