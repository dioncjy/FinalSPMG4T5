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
    