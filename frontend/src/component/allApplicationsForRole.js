import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    CardBody,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Button,
    Checkbox
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const JobApplication = ({ listingId }) => {
    const [applicants, setApplicants] = useState([]);
    const [applicantCount, setApplicantCount] = useState(null)
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [roleSkills, setRoleSkills] = useState([]);
    const [error, setError] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [filters, setFilters] = useState({})
    const [applicantsFilters, setApplicantsFilters] = useState({});
    const [activeFilters, setActiveFilters] = useState({
        departments: []
    });
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
                setFilteredApplicants(jsonApplicantsData);
                setApplicantCount(jsonApplicantsData.length)
                const uniqueDepartments = [...new Set(jsonApplicantsData.map((listing) => listing.dpt))];
                setFilters(
                    {
                        departments: uniqueDepartments,
                    }
                )
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

    const onFilterChange = (category, item) => {
        const updatedFilters = { ...activeFilters };
        console.log(updatedFilters)
        console.log(category, item)
        // Check if the elected item is already in the filters
        if (category === 'departments') {
            
            if (updatedFilters[category].includes(item)) {
                updatedFilters[category] = updatedFilters[category].filter((value) => value !== item);
                console.log(updatedFilters)
            } else {
                updatedFilters[category].push(item);
            }
        }
    
        // Update the activeFilters state with the new filters
        setActiveFilters(updatedFilters);
        setApplicantsFilters((prevApplicantsFilters) => ({
            ...prevApplicantsFilters,
            [item]: !prevApplicantsFilters[item], // Toggle the checkbox state
        }));

        if (
            Object.values(updatedFilters).every((filterItems) => filterItems.length === 0)
        ) {
            setFilteredApplicants(applicants);
            setApplicantCount(applicants.length)
            return;
        }
    
        const filteredApplicant = applicants.filter((applicant) => {
            
            return Object.entries(updatedFilters).some(([filterCategory, filterItems]) => {
                if (filterCategory === 'departments') {
                    console.log(filterItems.includes(applicant.dpt))
                    return filterItems.includes(applicant.dpt);
                }
                return false;
            });
        });
        setApplicantCount(filteredApplicant.length)
        setFilteredApplicants(filteredApplicant);
      };

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

            <div className="flex flex-row">
                <Typography variant="h6" className="mt-4">
                    Total Applicants: <span className="text-purple-500">{applicantCount}</span>
                </Typography>
                
                <Menu dismiss={{itemPress:false}} allowHover>
                    <MenuHandler>
                        <Button
                            variant="text"
                            className="flex items-center text-base font-normal capitalize"
                            >
                                <div className='flex flex-row w-24 items-center justify-between'>
                                    <Typography variant="h6" className="font-normal">
                                        Filter By
                                    </Typography>
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`w-4 transition-transform ${
                                        openMenu ? "rotate-180" : ""
                                        }`}
                                    />
                                </div>
                        </Button>
                    </MenuHandler>

                    <MenuList>
                        {Object.keys(filters).map((category) => {
                            const departments = filters[category];
                            return (
                            <Card
                                key={category}
                                id={category}
                                color="black"
                                shadow={false}
                                variant="gradient"
                                className="col-span-3 flex flex-col p-2 place-items-center rounded-md hover:bg-violet-200 hover:outline-none"
                            >
                                <Typography variant="h6">{category}</Typography>
                                {departments.map((department) => (
                                <MenuItem key={department} className="p-2">
                                    <label htmlFor={department} className="flex cursor-pointer items-center gap-2 p-2">
                                    <Checkbox
                                        checked={applicantsFilters[department]}
                                        ripple={false}
                                        id={department}
                                        containerProps={{ className: "p-0" }}
                                        className="hover:before:content-none"
                                        onChange={() => onFilterChange(category, department)}
                                    />
                                    {department}
                                    </label>
                                </MenuItem>
                                ))}
                            </Card>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
            


                <div>
                    {filteredApplicants.map((applicant) => (
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
