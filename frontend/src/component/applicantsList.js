import React, { useState, useEffect } from "react";
// import { Typography, Button, Chip, Progress } from "@material-tailwind/react";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Checkbox,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Progress,
} from "@material-tailwind/react";

const staff_id = 140001;
const listing_id = 1;
const role_name = "Account Manager";


const ApplicantsListWithFilters = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [department, setDepartment] = useState("all");

    const location = useLocation();
    const role_listing = location.state && location.state.role_listing;
    // console.log(role_listing.listing_id)

  useEffect(() => {
    const getSpecificApplicant = `http://127.0.0.1:5000/getspecificapplicant/${listing_id}&${role_name}&${staff_id}`;
    // Fetch the list of applicants
    async function fetchData() {
      try {
        const response = await fetch(getSpecificApplicant);
        const jsonData = await response.json();
        console.log(jsonData);
        setApplicants(jsonData);
        setFilteredApplicants(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData()
  }, []);

  // const fetchedApplicants = [
  //   // Sample data
  //   {
  //     staff_id: 1,
  //     staff_name: "John Doe",
  //     department: "Tech",
  //     skills: ["React", "Node"],
  //     comments: "I fit this role perfectly",
  //   },
  // //   {
  // //     staff_id: 2,
  // //     staff_name: "Jane Smith",
  // //     department: "Design",
  // //     country: "UK",
  // //     skills: ["Photoshop", "Illustrator"],
  // //   },
  //   // ... more applicants
  // ];
  // setApplicants(fetchedApplicants);
  // setFilteredApplicants(fetchedApplicants);

  // useEffect(() => {
  //   if (department === "all") {
  //     setFilteredApplicants(applicants);
  //   } else {
  //     const filtered = applicants.filter(
  //       (applicant) => applicant.department === department
  //     );
  //     setFilteredApplicants(filtered);
  //   }
  // }, [department, applicants]);

  // return (
  //   <div>
  //     <Filters setDepartment={setDepartment} />
  //     {filteredApplicants.map((applicant) => (
  //       <ApplicantCard
  //         key={applicant.id}
  //         applicant={applicant}
  //         roleSkills={[]}
  //       />
  //     ))}
  //   </div>
  // );
};

export default ApplicantsListWithFilters;

const Filters = ({ setDepartment }) => {};

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
                    Staff ID {applicant.staff_id}
                  </Typography>
                </div>

                <div className="flex flex-col border-t border-b border-blue-gray-50">
                  <div className="flex-col mt-8 mb-8">
                    <Typography variant="h4">Staff Name</Typography>
                    <div className="flex-col mt-4">
                      <Typography variant="normal" className="font-normal">
                        {applicant.staff_name}
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
                          {applicant.department}
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
                        {applicant.skills.join(", ")}
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
