import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Card,
  Typography,
  Progress,
} from "@material-tailwind/react";

const staff_id = 140001;
const listing_id = 1;
const role_name = "Account Manager";


const ApplicantsListWithFilters = () => {
  const [applicants, setApplicants] = useState({});
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [department, setDepartment] = useState("all");
  const [roleSkills, setRoleSkills] = useState([]);

    const location = useLocation();
    const role_listing = location.state && location.state.role_listing;

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

fetchSpecificApplicant();
fetchRoleSkill()

}, []);

  // useEffect(() => {
  //   if (department === "all") {
  //     setFilteredApplicants(applicants);
  //   } else {
  //     const filtered = applicants.filter(
  //       (applicant) => applicant.dpt === department
  //     );
  //     setFilteredApplicants(filtered);
  //   }
  //   console.log(filteredApplicants)
  //   console.log(applicants)
  // }, [department, applicants]);

  return (
    <div>
      {/* <Filters setDepartment={setDepartment} /> */}
      {/* {filteredApplicants.map((applicant) => ( */}
        <ApplicantCard
          key={applicants.listing_id}
          applicant={applicants}
          roleSkills = {roleSkills}
        />
      {/* ))} */}
    </div>
  );
};

// const Filters = ({ setDepartment }) => {};

const ApplicantCard = ({ applicant, roleSkills }) => {
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
                    Staff ID {applicant.listing_id}
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
                        <Typography variant="h5">Department</Typography>
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
                    {!isNaN(skillMatchPercentage) && (
                      <div className="flex-col mt-4">
                        <Typography variant="normal" className="font-normal">
                          {skillMatchPercentage}% Skills Matched
                        </Typography>
                      </div>
                    )}
                    <div className="flex-col mt-4">
                      <Progress value={skillMatchPercentage} />
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
                        <Typography variant="h5">Comments</Typography>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApplicantsListWithFilters