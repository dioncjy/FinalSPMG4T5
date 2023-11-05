import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Card,
  Typography,
  Progress,
  Button
} from "@material-tailwind/react";

const ApplicantsListWithFilters = () => {
  const [applicants, setApplicants] = useState({});
  const [roleSkills, setRoleSkills] = useState([]);
  const [staffSkills, setStaffSkills] = useState([]);
  const [skillMatchPercentage, setSkillMatchPercentage] = useState(0);

  const location = useLocation();
  const applicant_data = location.state && location.state.applicant_data;
  const listing_id = applicant_data.listing_id
  const role_name = applicant_data.role_name
  const staff_id = applicant_data.staff_id

  useEffect(() => {
    async function fetchSpecificApplicant() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/getspecificapplicant/${listing_id}&${role_name}&${staff_id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
        } else {
          const jsonApplicantData = await response.json();
          setApplicants(jsonApplicantData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
      }
  } 

    async function fetchRoleSkill() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/role_skill/${role_name}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
      }
        const jsonRoleSkillData = await response.json();
        setRoleSkills(jsonRoleSkillData.skill_name)
      } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    async function fetchStaffSkill() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/staff_skill/${staff_id}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
      }
        const jsonStaffSkillData = await response.json();
        setStaffSkills(jsonStaffSkillData.staff_skill)
        console.log("staff_skill", jsonStaffSkillData.staff_skill)
      } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

  fetchSpecificApplicant();
  fetchRoleSkill();
  fetchStaffSkill();

}, []);
console.log(applicants)
useEffect(() => {
  const percentage = findMatchingSkillsPercentage(staffSkills, roleSkills);
  setSkillMatchPercentage(percentage);
}, [staffSkills, roleSkills]);

const findMatchingSkillsPercentage = (userSkillArray, roleSkillArray) => {
  const commonStrings = []
  var commonCounter = 0
  const numRoleSkill = roleSkillArray.length

  for (const roleSkill of roleSkillArray) {
      if (userSkillArray.includes(roleSkill)) {
          commonCounter += 1
      }
  }

  return (commonCounter / numRoleSkill * 100).toFixed(2)
} 

  return (
    <div>
        <ApplicantCard
          key={applicants.listing_id}
          applicant={applicants}
          roleSkills = {roleSkills}
          skillsMatchPercentage={skillMatchPercentage}
        />
    </div>
  );
};

const goBack = () => {
  window.history.back();
}

const ApplicantCard = ({ applicant, skillsMatchPercentage }) => {

  return (
    <Card className="w-10/12" style={{ margin: "2rem", padding: "1rem" }}>
      <div className="w-32">
        <div className="p-6 bg-blue-500">
          <div className="border p-6 rounded-lg">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col mb-8">
                  <Typography variant="h4">
                    Staff ID {applicant.staff_id}
                  </Typography>
                </div>

                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex-col mt-8 mb-8">
                    <Typography variant="h4">Staff Name</Typography>
                    <div className="flex-col mt-4">
                      <Typography variant="normal" className="font-normal">
                        {applicant.applicant_name}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex flex-row mt-8 mb-8 justify-between">
                    <div className="flex flex-col">
                      <div className="flex-col mt-4">
                        <Typography variant="h4">Department</Typography>
                      </div>
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {applicant.dpt}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex-col mt-8 mb-8">
                    <Typography variant="h4">Skills</Typography>
                    {!isNaN(skillsMatchPercentage) && (
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {skillsMatchPercentage}% Skills Matched
                        </Typography>
                      </div>
                    )}
                    <div className="flex-col mt-4">
                      <Progress value={skillsMatchPercentage} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex flex-row mt-8 mb-8 justify-between">
                    <div className="flex flex-col">
                      <div className="flex-col mt-4">
                        <Typography variant="h4">Comments</Typography>
                      </div>
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {applicant.comments}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={goBack} className="flex items-center p-6 bg-violet-600 mt-2" size="sm">
                        Back
                      </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApplicantsListWithFilters