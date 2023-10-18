import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    CardBody,
    Button,
} from "@material-tailwind/react";

//hardcoded to listing id = 1
/* 
1. need to edit code to show no applicants if there are no applicants for a role
2. to connect each applicant to their own applicant page
*/
const JobApplication = ({ listingId = 1 }) => {
    const [applicants, setApplicants] = useState([]);
    const [roleSkills, setRoleSkills] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        //Hardcoded role name and skills to select account manager
        <Card className="w-10/12 mx-auto p-4">
            <CardBody>
                <Typography variant="h5">{roleSkills.length > 0 && roleSkills[0].role_name}
                </Typography>
                <Typography variant="body2">
                    Skills required:
                    {
                        roleSkills.length > 0 && roleSkills[0].skill_name.map((skill) => (
                            <span className="text-purple-500"> {skill} / </span>
                        ))
                    }
                </Typography>

                <Typography variant="h6" className="mt-4">
                    Total Applicants <span className="text-purple-500">{applicants.length}</span>
                </Typography>



                <div>
                    {applicants.map((applicant) => (
                        <div
                            key={applicant.listing_id}
                            className="cursor-pointer w-10/12 my-4 hover:bg-gray-200 transition-all duration-200"
                            onClick={() => { console.log(`Clicked on ${applicant.applicant_name}`); }}
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
