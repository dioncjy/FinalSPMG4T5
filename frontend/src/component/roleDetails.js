import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Card,
  Typography,
  CardBody,
  Button
} from "@material-tailwind/react";

const RoleInformation = () => {
  const [roleDetails, setRoleDetails] = useState({});
  const [roleSkills, setRoleSkills] = useState([]);
  const role_name = "Account Manager";  // Mocked role_name
  const listing_id = 6;  // Mocked listing_id

  useEffect(() => {
    async function fetchRoleDetails() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/getrolelisting/${role_name}&${listing_id}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const jsonRoleData = await response.json();
          setRoleDetails(jsonRoleData);
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
          setRoleSkills(jsonRoleSkillData.skill_name);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

    fetchRoleDetails();
    fetchRoleSkill();

  }, [role_name]);

  return (
    <RoleInformationCard
      role={roleDetails}
      roleSkills={roleSkills}
    />
  );
};

const RoleInformationCard = ({ role, roleSkills }) => {
      // This is a placeholder percentage. You'll want to replace this logic
  // with the actual calculation based on roleSkills and the applicant's skills.
  const skillMatchPercentage = 75;

  return (
    <Card className="w-10/12" style={{ margin: "2rem", padding: "1rem" }}>
      <div className="w-32">
        <div className="p-6 bg-blue-500">
          <div className="border p-6 rounded-lg">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col mb-8">
                  <Typography variant="h4">
                    Role Name 
                  </Typography>
                  <div className="flex-col mt-4">
                      <Typography variant="normal" className="font-normal">
                        {role.role_name}
                      </Typography>
                    </div>
                </div>

                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex-col mt-8 mb-8">
                    <Typography variant="h4">Role Description</Typography>
                    <div className="flex-col mt-4">
                      <Typography variant="normal" className="font-normal">
                        {role.role_description}
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
                          {role.department}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex-col mt-8 mb-8">
                    <Typography variant="h4">Skills</Typography>
                    {!isNaN(skillMatchPercentage) && (
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {skillMatchPercentage}% Skills Matched
                        </Typography>
                      </div>
                    )}
                    <div className="flex-col mt-4">
                      {/* <Progress value={skillMatchPercentage} /> */}
                    </div>
                    <div className="flex-col mt-4">
                      <Typography variant="normal" className="font-normal">
                        {roleSkills.join(", ")}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex flex-row mt-8 mb-8 justify-between">
                    <div className="flex flex-col">
                      <div className="flex-col mt-4">
                        <Typography variant="h4">Reporting Manager</Typography>
                      </div>
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {role.reporting_manager}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex sm:flex-row justify-between'>
                      <div className='flex-row mt-8 mb-8'>
                          <Button className="flex items-center p-6 bg-violet-600" size="sm">
                              Apply
                          </Button>
                      </div>      
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoleInformation;
