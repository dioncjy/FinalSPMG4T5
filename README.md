# FinalSPMG4T5
*This is a SMU IS212 project which goal is to develop the first release of a system using scrum methodology.*

This web application serves as a versatile tool within our organization, empowering all staff members to explore and apply for new job roles seamlessly. 
The primary focus of the Self-Service Job Role Portal (SBRP) lies in role and skill set alignment. Staff members can utilize this user-friendly platform to access real-time job role listings, eliminating the need for manual email notifications and responses. 
The SBRP operates as a self-help portal, offering valuable functionalities such as skill-based candidate discovery for recruiters. Staff members can effortlessly browse available job roles, submit applications confidently if their skillsets align, and initiate the application process. 
While the SBRP streamlines role discovery and application, subsequent follow-up remains outside the current project scope, ensuring an efficient and focused user experience.

**Link to our GitHub Repository:** https://github.com/dioncjy/FinalSPMG4T5

## Setting the application up

### Setting up the backend
1. Add an environment file named `.env` in the root folder, and copy the following variables into the file:
```
rds_host = 'database-work.c2bsg3plgld1.us-east-1.rds.amazonaws.com'
rds_name = 'SPM'
rds_user = 'postgres'
rds_password = 'Matthias159!'
```

2. From the root folder, enter the command: `python main.py`

3. Tests will run automatically in our CI Pipeline using GitHub actions once a pull request has been made. However, testing can also be ran manually by:
    - going to the root folder
    - enter the command: `python -m pytest -v ./backend/test`

### Setting up the frontend
    cd frontend
    
