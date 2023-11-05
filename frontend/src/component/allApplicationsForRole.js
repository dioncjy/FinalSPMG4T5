import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    CardBody
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const JobApplication = ({ listingId}) => {
    const [applicants, setApplicants] = useState([]);
    const [roleSkills, setRoleSkills] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchApplicantsByListing() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/getapplicantsbylisting/${listingId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonApplicantsData = await response.json();
                setApplicants(jsonApplicantsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        }

        async function fetchRoleSkills() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/role_skill`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonRoleSkillsData = await response.json();
                setRoleSkills(jsonRoleSkillsData);
            } catch (error) {
                console.error('Error fetching role skills data:', error);
                setError(error.message);
            }
        }

        fetchRoleSkills();
        fetchApplicantsByListing();
    }, [listingId]);

    if (error) {
        return <p>Error loading data: {error}</p>;
    }
    
    const HandleClickOnApplicant = (applicant) => {
        const data = {
            "role_name": applicant.role_name,
            "listing_id": applicant.listing_id,
            "staff_id": applicant.staff_id,
        }
        navigate("/viewApplicantDetails", {state: {applicant_data: data}});

    }

// Extract the role name from the first applicant as an example
const roleName = applicants.length > 0 ? applicants[0].role_name : null; 
// Find the role skills using the extracted role name
const matchedRoleSkills = roleSkills.find(r => r.role_name === roleName);

return (
    <Card className="w-10/12 mx-auto p-4">
        <CardBody>
            <Typography variant="h5">
                {roleName}
            </Typography>
            <Typography variant="body2">
                Skills required:
                {
                    matchedRoleSkills?.skill_name.map((skill) => (
                        <span className="text-purple-500"> {skill} / </span>
                    ))
                }
            </Typography>

            <Typography variant="h6" className="mt-4">
                Total Applicants: <span className="text-purple-500">{applicants.length}</span>
            </Typography>


                <div>
                    {applicants.map((applicant) => (
                        <div
                            key={applicant.listing_id}
                            className="cursor-pointer w-10/12 my-4 hover:bg-gray-200 transition-all duration-200"
                            onClick={() => {HandleClickOnApplicant(applicant)}}
                            style={{ padding: "10px" }}
                        >
                            <Card>
                                <CardBody>
                                    <Typography>
                                        {applicant.applicant_name}
                                    </Typography>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>

            </CardBody>
        </Card>
    );
};

export default JobApplication;
