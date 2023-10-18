import requests
import pytest

BASE_URL = 'http://127.0.0.1:5000' 

# I suppose what would look nice is we create test table using SQLAlchemy using the schema file 
# FOr the session create tablte
# Then add in test rows 
# Like this can verify its working instead of querying against all the shit in our table

# Test your Flask app's endpoints
def test_get_all_role_listings():
    response = requests.get(f'{BASE_URL}/role_listing')
    assert response.status_code == 200
    #Add more more more

def test_get_staff_from_module():
    response = requests.get(f'{BASE_URL}/staff')
    assert response.status_code == 200
    # Add more more
    # I NOT sure waat to add here
    # I believe we should ad


if __name__ == '__main__':
    pytest.main()

