import React, { useState, useEffect } from 'react'
import { Typography, Button, Textarea, Select, Option, Input } from "@material-tailwind/react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Dropdown from './dropdown';


// unique roles = http://127.0.0.1:5000/uniquerole -- populate the role name dropdown
// role description = http://127.0.0.1:5000/getroledetails/<role_name> -- Populate the role description based on selected skill + department
// skills = http://127.0.0.1:5000/role_skill/<role_name> -- Get the skills needed for each role 

export default function HRAddRole() {
    const [openingDate, setOpeningDate] = useState();
    const [closingDate, setClosingDate] = useState();
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('')
    const [roleDescription, setRoleDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [department, setDepartment] = useState('');
    const [reportingManager, setReportingManager] = useState('')
    const [dptLimitReached, setDptLimitReached] = useState(false)
    const [rptLimitReached, setRptLimitReached] = useState(false)
    
    
    useEffect(() => {
        // Fetch unique roles
        fetch('http://127.0.0.1:5000/uniquerole')
            .then((response) => response.json())
            .then((data) => {
                // Set unique roles in the dropdown
                setRoles(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const goBack = () => {
        window.history.back();
    }

    const handleDepartmentChange = (e) => {
        const maxCharacter = 50
        setDepartment(e.target.value)
        console.log(department.length)

        
        if (department.length == 50) {
            setDptLimitReached(true)
        }
        else {
            setDptLimitReached(false)
        }
    }

    const handleReportingManagerChange = (e) => {
        const maxCharacter = 50
        setReportingManager(e.target.value)
        
        if (reportingManager.length == 50) {
            setRptLimitReached(true)
        }
        else {
            setRptLimitReached(false)
        }
    }

    const formatDate = (date) => {
        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(inputDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
    
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
                .catch((error) => console.error(error)),
        ])
        .catch((error) => console.error(error));
    }

    const handleAddRole = () => {
        console.log("OPENING DATE", openingDate)
        console.log("CLOSING DATE", closingDate)

        const openingDateFormatted = formatDate(openingDate)
        const closingDateFormatted = formatDate(closingDate)

        const url = `http://127.0.0.1:5000/addrole/${selectedRole}&${department}&${closingDateFormatted}&${openingDateFormatted}&${reportingManager}`;

        console.log("URL", url)

        fetch(url, {
            method: 'POST'
        })
        .then((response) => {
            if (response.ok) {
                console.log('Role listing added successfully');
            } else {
                // Handle error
                console.error('Failed to add role');
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
                                Add a Role
                            </Typography>
                            <div className='flex flex-col border-b border-blue-gray-50'>
                                <div className='flex-col mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Role Name
                                        </Typography>
                                    </div>
                                    <div className='flex w-full flex-col'>
                                        <Dropdown
                                            label="Role Name"
                                            options={roles}
                                            value={selectedRole}
                                            onChange={handleChange}
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
                                    <textarea style={{ width: "100%", height: "100px", background: "#E5E5E5" }} placeholder="role description here" value={roleDescription} disabled />
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
                                            <span style={{color:'red'}}>Character limit of 50 reached.</span>
                                        ): (
                                            <span></span>   
                                        )
                                        }
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
                                            <DatePicker onChange={setOpeningDate} value={openingDate} maxDate={closingDate} format="y-MM-dd" required />
                                        </div>
                                    </div>
                                    <div className='flex flex-col' style={{ width: "50%" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Closing Date (YYYY/MM/DD)
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
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
                                    {rptLimitReached ? (
                                        <span style={{color:'red'}}>Character limit of 50 reached.</span>
                                    ): (
                                        <span></span>   
                                    )
                                    }
                                </div>
                            </div>
                            <div className='flex sm:flex-row justify-between'>
                                <div className='flex-row mt-8 mb-8'>
                                    <Button onClick={goBack} className="flex items-center p-6 bg-violet-600" size="sm">
                                        Back
                                    </Button>
                                </div>
                                <div className='flex-row mt-8 mb-8'>
                                    <Button className="flex items-center p-6 bg-violet-600" size="sm" onClick={handleAddRole}>
                                        Add Role Listing
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}