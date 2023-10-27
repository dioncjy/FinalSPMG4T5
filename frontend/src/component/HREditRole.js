import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Textarea, Select, Option, Input, input } from "@material-tailwind/react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Dropdown from './dropdown';
import SuccessModal from "./editRoleListingSuccessModal";


// unique roles = http://127.0.0.1:5000/uniquerole -- populate the role name dropdown
// role description = http://127.0.0.1:5000/getroledetails/<role_name> -- Populate the role description based on selected skill + department
// skills = http://127.0.0.1:5000/role_skill/<role_name> -- Get the skills needed for each role 

// for offline test @zac
const role = {
    "closing_date": "2023-10-11",
    "department": "test department",
    "listing_id": 8,
    "opening_date": "2023-09-08",
    "reporting_manager": "test reporting manager",
    "role_description": "The Operation Planning Executive supports plant operations by coordinating day-to-day production activities, as well as maintenance and turnaround schedules and activities, for production shift teams, so as to meet production plans and schedules.",
    "role_name": "Ops Planning Exec"
}

  
export default function HREditRole(props) {
    const role = props.role;
    console.log(role)

    const [rptBlank, setRptBlank] = useState();
    const [dptBlank, setDptBlank] = useState();
    const [listing_id, setListingId] = useState(role.listing_id);
    const [openingDate, setOpeningDate] = useState(new Date(role.opening_date));
    const [closingDate, setClosingDate] = useState(new Date(role.closing_date));
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(role.role_name)
    const [roleDescription, setRoleDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [department, setDepartment] = useState(role.department);
    const [reportingManager, setReportingManager] = useState(role.reporting_manager)
    const [dptLimitReached, setDptLimitReached] = useState(false)
    const [rptLimitReached, setRptLimitReached] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const currentDateUnformatted = new Date().toLocaleDateString('nl-NL'); // Get the current date in "DD-MM-YYYY" format
    const currentDate = new Date(currentDateUnformatted.split('-').reverse().join('-')); // Convert the date to "YYYY-MM-DD" format
    
    useEffect(() => {
        if (department.trim() === "") {
            setDptBlank(true);
        }

        if (reportingManager.trim() === "") {
            setRptBlank(true)
        }

        // role_skill
        fetch(`http://127.0.0.1:5000/role_skill/${role.role_name}`)
            .then((response) => response.json())
            .then((data) => {
                setSkills(data.skill_name.toString());
            })
            .catch((error) => console.error(error))
    }, []);

    const openSuccessModal = () => {
        console.log("popup success")
        setIsSuccessModalOpen(true);
      };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    const goBack = () => {
        window.history.back();
    }

    const handleDepartmentChange = (e) => {
        const maxCharacter = 50;
        const inputValue = e.target.value;
    
        if (inputValue.trim() === "") {
            setDptBlank(true);
            setDptLimitReached(false);
        } else if (inputValue.length === maxCharacter) {
            setDptBlank(false);
            setDptLimitReached(true);
        } else {
            setDptBlank(false);
            setDptLimitReached(false);
        }
    
        setDepartment(inputValue);
    };
    
    const formatDate = (date) => {
        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(inputDate.getDate()).padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
    

    const handleReportingManagerChange = (e) => {
        const maxCharacter = 50;
        const inputValue = e.target.value;
    
        if (inputValue.trim() === "") {
            setRptBlank(true);
            setRptLimitReached(false);
        } else if (inputValue.length === maxCharacter) {
            setRptBlank(false);
            setRptLimitReached(true);
        } else {
            setRptBlank(false);
            setRptLimitReached(false);
        }
    
        setReportingManager(inputValue);
    };
    
    const handleChange = (selectedValue) => {
        setSelectedRole(selectedValue);
    
        Promise.all([
            // fetch role description
            fetch(`http://127.0.0.1:5000/getroledetails/${selectedValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setRoleDescription(data.role_desc);
                })
                .catch((error) => console.error(error)),
            
            // skillz
            fetch(`http://127.0.0.1:5000/role_skill/${selectedValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setSkills(data.skill_name.toString());
                })
                .catch((error) => {
                    console.error(error)
                    //delete after offline
                    setSkills(skills)
                }),
        ])
        .catch((error) => console.error(error));
    }

    const handleEditRole = () => {
        console.log("LISTING ID", listing_id)
        console.log("OPENING DATE", openingDate)
        console.log("CLOSING DATE", closingDate)
        const openingDateFormatted = formatDate(openingDate)
        const closingDateFormatted = formatDate(closingDate)
        const url = `http://127.0.0.1:5000/editrolelisting/${listing_id}&${selectedRole}&${department}&${closingDateFormatted}&${openingDateFormatted}&${reportingManager}`;

        console.log("URL", url)

        fetch(url, {
            method: 'PUT'
        })
        .then((response) => {
            if (response.ok) {
                console.log('Role listing edit successfully');
            } else {
                // Handle error
                console.error('Failed to edit role');
            }
        })
        .catch((error) => console.error(error));
    }

    return (
        <div className="w-32">
            <div className="p-6 bg-blue-500">
                <div className="border p-6 rounded-lg">
                    <div className="flex flex-col">
                        <form className='flex flex-col sm:flex-row'>
                            <Typography variant="normal" className="font-bold mb-6">
                                Edit Role
                            </Typography>
                            <div className='flex flex-col border-b border-blue-gray-50'>
                                <div className='flex-col mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Role Name
                                        </Typography>
                                    </div>
                                    <div className='flex w-full flex-col'>
                                        {/* to fetch selectedRole, change value and autopopulate fields from previous roletable page */}
                                        <input
                                            value={role.role_name}
                                            onChange={handleChange}
                                            style = {{
                                                height: "40px",
                                                background: "#E5E5E5" 
                                            }}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Role Description
                                        </Typography>
                                    </div>
                                    <textarea style={{ width: "100%", height: "100px", background: "#E5E5E5" }} placeholder="role description here" value={role.role_description} disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Skills 
                                        </Typography>
                                    </div>
                                    <textarea style={{ width: "100%", height: "100px", background: "#E5E5E5" }} placeholder='skills here' value={skills} disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Department 
                                        </Typography>
                                    </div>
                                    <input placeholder='departments here' style={{ width: "100%", height: "50px"}} value={department} onChange={handleDepartmentChange} maxLength={51} required />
                                    <div>
                                        {dptLimitReached ? (
                                            <span style={{ color: 'red' }}>Character limit of 50 reached.</span>
                                        ) : dptBlank ? (
                                            <span style={{ color: 'red' }}>Field cannot be blank.</span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex flex-row mt-8 mb-8'>
                                    <div className='flex flex-col' style={{ width: "50%", paddingRight: "24px" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Opening Date (YYYY/MM/DD)
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4' style={{ width: "90%", height: "50px"}}>
                                        {/* to fetch the previous date here as value */}
                                            <DatePicker onChange={setOpeningDate} value={openingDate} format="y-MM-dd" disabled /> 
                                        </div>
                                    </div>
                                    <div className='flex flex-col' style={{ width: "50%" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Closing Date (YYYY/MM/DD)
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            {/* to set the previous opening date here */}
                                            <DatePicker onChange={setClosingDate} value={closingDate} minDate={openingDate} format="y-MM-dd" required />
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Reporting Manager 
                                        </Typography>
                                    </div>
                                    <input placeholder='Reporting Manager here' style={{ width: "100%", height: "50px"}} value={reportingManager} onChange={handleReportingManagerChange} maxLength={51} required />
                                </div>
                                <div>
                                    {rptBlank ? (
                                        <span style={{ color: 'red' }}>It can't be blank.</span>
                                    ) : rptLimitReached ? (
                                        <span style={{ color: 'red' }}>Character limit of 50 reached.</span>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                            <div className='flex sm:flex-row justify-between'>
                                <div className='flex-row mt-8 mb-8'>
                                    <Button onClick={goBack} className="flex items-center p-6 bg-violet-600" size="sm">
                                        Back
                                    </Button>
                                </div>
                                <div className='flex-row mt-8 mb-8'>
                                    {department.trim() !== "" 
                                    && reportingManager.trim() !== "" 
                                    && openingDate !== null 
                                    && closingDate !== null ? 
                                    (
                                        <Button className="flex items-center p-6 bg-violet-600" size="sm" onClick={() => {
                                            handleEditRole()
                                            openSuccessModal()
                                            }}>
                                            Edit Role Listing
                                        </Button>
                                    ) : 
                                    (<p></p>)}
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        </div>
    );
}