import React, { useState, useEffect } from 'react'
import { Typography, Button, Textarea, Select, Option, Input } from "@material-tailwind/react";

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
    const [roleName, setRoleName] = useState();
    const handleChange=(e)=>{
        setTemp(e);
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
                                    <Textarea style={{ height: "100px" }} placeholder='role desc here' disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Skills 
                                        </Typography>
                                    </div>
                                    <Textarea style={{ height: "100px" }} placeholder='skills here' disabled />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <div className='flex-col mb-4'>
                                        <Typography variant="h4">
                                            Department 
                                        </Typography>
                                    </div>
                                    <Textarea placeholder='departments here' />
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex flex-row mt-8 mb-8'>
                                    <div className='flex flex-col' style={{ width: "50%", paddingRight: "24px" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Opening Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Input placeholder='opening date' style={{ height: "50px" }} />  
                                        </div>
                                    </div>
                                    <div className='flex flex-col' style={{ width: "50%" }}>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Closing Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Input placeholder='closing date' style={{ height: "50px" }} />
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
                                    <Textarea placeholder='departments here' />
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