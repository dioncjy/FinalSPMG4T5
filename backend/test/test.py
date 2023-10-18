import requests
import pytest


# Define the base URL for your Flask app
BASE_URL = 'http://127.0.0.1:5000'  # Update the URL if your app runs on a different URL

# Test your Flask app's endpoints
def test_get_all_role_listings():
    response = requests.get(f'{BASE_URL}/role_listing')
    assert response.status_code == 200
    # Add more assertions to check the response data if needed

def test_get_staff_from_module():
    response = requests.get(f'{BASE_URL}/staff')
    assert response.status_code == 200
    # Add more assertions to check the response data if needed

# Add more test functions for other endpoints

if __name__ == '__main__':
    pytest.main()

