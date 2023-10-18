import requests
import pytest

BASE_URL = 'http://127.0.0.1:5000' 

# Test your Flask app's endpoints
def test_get_all_role_listings():
    response = requests.get(f'{BASE_URL}/role_listing')
    assert response.status_code == 200
    #Add more more more

def test_get_staff_from_module():
    response = requests.get(f'{BASE_URL}/staff')
    assert response.status_code == 200
    # Add more more


if __name__ == '__main__':
    pytest.main()

