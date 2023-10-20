@app.route('/role_skill', methods=['GET'])
def get_all_role_skills_details():
    role_skills_data = hr.getAllRoleSkills()
    return role_skills_data