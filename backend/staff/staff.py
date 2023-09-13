from flask import Flask, jsonify, Blueprint
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

db_host = os.getenv('rds_host')
db_name = os.getenv('rds_name')
db_user = os.getenv('rds_user')
db_password = os.getenv('rds_password')

# Create a function to establish a database connection
def connect_to_database():
    try:
        # Connect to the AWS RDS PostgreSQL database
        connection = psycopg2.connect(
            host=db_host,
            database=db_name,
            user=db_user,
            password=db_password
        )

        # Create a cursor to interact with the database
        cursor = connection.cursor()
        return connection, cursor
    except Exception as e:
        return None, None

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
