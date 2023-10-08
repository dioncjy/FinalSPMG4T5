import React, { useState, useEffect } from 'react'
import { Typography, Button, Textarea, Select, Option, Input } from "@material-tailwind/react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const roles = [
    {
        "roleName": "Software Engineer",
        "roleDescription": "Software Engineer",
        "skills": "C++, Java, Python",
        "department": "Software",
        "openingDate": "2023-09-01",
        "closingDate": "2023-12-31",
        "reportingManager": "John Doe"
    }, 
    {
        "roleName": "Data Analyst",
        "roleDescription": "Analyse Data",
        "skills": "SQL, Python, R",
        "department": "Data",
        "openingDate": "2023-09-01",
        "closingDate": "2023-12-31",
        "reportingManager": "John Doe"
    }, 
]

export default function HRAddRole() {
    const [temp,setTemp] = useState();
    const [openingDate, setOpeningDate] = useState();
    const [closingDate, setClosingDate] = useState();
    const [roleName, setRoleName] = useState();

    const currentDate = new Date().toLocaleDateString('en-GB'); // Get the current date in "DD-MM-YYYY" format

    const handleChange=(e)=>{
        setRoleName(e);
        console.log(roleName)
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
                                        <Select
                                            label="Role Name"
                                            onChange={handleChange}
                                            animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                            }}
                                            size="lg"
                                            style={{
                                                height: "3rem",
                                            }}
                                            value={roleName}
                                        >
                                            {roles.map((role) => (
                                                <Option key={role.roleName} value={role.roleName}>
                                                    {role.roleName}
                                                </Option>
                                            ))}
                                        </Select>
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
                                    <textarea style={{ width: "100%", height: "100px", background: "#E5E5E5" }} placeholder="role description here" value={roles.roleDescription} disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Skills 
                                        </Typography>
                                    </div>
                                    <textarea style={{ width: "100%", height: "100px", background: "#E5E5E5" }} placeholder='skills here' disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Department 
                                        </Typography>
                                    </div>
                                    <textarea style={{ width: "100%", background: "#E5E5E5" }}  placeholder='department here' />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex flex-row mt-8 mb-8'>
                                    <div className='flex flex-col' style={{ width: "50%", paddingRight: "24px" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Opening Date (DD/MM/YYYY)
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4' style={{ width: "90%", height: "50px"}}>
                                            <DatePicker onChange={setOpeningDate} value={openingDate} maxDate={closingDate} required />
                                        </div>
                                    </div>
                                    <div className='flex flex-col' style={{ width: "50%" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Closing Date (DD/MM/YYYY)
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <DatePicker onChange={setClosingDate} value={closingDate} minDate={openingDate} required />
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
                                    <input placeholder='departments here' style={{ width: "100%", height: "50px"}} required />
                                </div>
                            </div>
                            <div className='flex sm:flex-row justify-between'>
                                <div className='flex-row mt-8 mb-8'>
                                    <Button className="flex items-center p-6 bg-violet-600" size="sm">
                                        Back
                                    </Button>
                                </div>
                                <div className='flex-row mt-8 mb-8'>
                                    <Button className="flex items-center p-6 bg-violet-600" size="sm">
                                        Add
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