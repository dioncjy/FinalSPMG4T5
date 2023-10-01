import React, { useState, useEffect } from 'react'
import { Typography, Button, Chip, Progress } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';

const staff_id = 1

const user_skills = [
    "prototyping", "UX", "Communication Skills",
]
const role_listing = {
    "listing_id": 1,
    "role_name": "Product Manager",
    "department" :"IT",
    "description": "Manage products. This is the description",
    "closing_date": "2023-12-23",
    "opening_date": "2023-09-09",
    "reporting_manager": "Bajesh Ralan",
}

const roleSkillDataMock = {
    "role_name": "Product Manager",
    "skill_name": "managing"
}

const roleSkillArrayMock = [
    "managing"
]

// staff_id 1 0%
const staffSkillDataMock1 = {
    "staff_id": 1,
    "skill_name": "coding"
}

const staffSkillArrayMock1 = [
    "coding"
]

// staff_id 2 100% can apply 
const staffSkillDataMock2 = {
    "staff_id": 2,
    "skill_name": "managing"
}

const staffSkillArrayMock2 = [
    "managing"
]


const findMatchingSkillsPercentage = (userSkillArray, roleSkillArray) => {
    const commonStrings = []
    var commonCounter = 0
    const numRoleSkill = roleSkillArray.length

    for (const roleSkill of roleSkillArray) {
        if (userSkillArray.includes(roleSkill)) {
            console.log("ROLE SKILL", roleSkill)
            commonCounter += 1
        }
    }

    return (commonCounter / numRoleSkill * 100).toFixed(2)
} 

// TEST
// const staffSkillArray = staffSkillDataMock2.skill_name.split(',')
// const staffSkillLen = userSkillArray.length 

// const roleSkillArray = roleSkillDataMock.skill_name.split(',')
// const roleSkillLen = roleSkillArray.length 

// const skillMatchPercentage = findMatchingSkillsPercentage(userSkillArray, roleSkillArray)

export default function StaffListingDetails(props) {
    const [roleListing, setRoleListing] = useState([]);
    const [skillMatchPercentage, setSkillMatchPercentage] = useState(0)

    // FOR NOW
    const [roleSkill, setRoleSkill] = useState({})
    const [roleSkillArray, setRoleSkillArray] = useState([])
    var [roleSkillLen, setRoleSkillLen] = useState(0)

    const [staffSkill, setStaffSkill] = useState({})
    const [staffSkillArray, setStaffSkillArray] = useState([])
    var [staffSkillLen, setStaffSkillLen] = useState(0)
       
    const location = useLocation();
    const role = location.state && location.state.role;
    
    useEffect(() => {
        setRoleListing(role)

        const getStaffSkill = `http://127.0.0.1:5000/staff_skill/${staff_id}`
        const getRoleSkill = `http://127.0.0.1:5000/role_skill/${role.role_name}`
        
        async function fetchData() {
            try {
                const [staffSkillResponse, roleSkillResponse] = await Promise.all([
                    //staffSkillDataMock1 or 2 swap out
                    fetch(getStaffSkill),

                    //roleSkillDataMock swap out
                    fetch(getRoleSkill),
            ]);
        
                if (!staffSkillResponse.ok || !roleSkillResponse.ok) {
                    throw new Error('Something is wrong');
                }

                const staffSkillData = await staffSkillResponse.json();
                const roleSkillData = await roleSkillResponse.json();

                setStaffSkill(staffSkillData); 
                setStaffSkillArray(staffSkillData.staff_skill.split(','))

                setRoleSkill(roleSkillData);
                setRoleSkillArray(roleSkillData.skill_name.split(','))
            }   
            catch (error) {
                // for using mock data
                setStaffSkill(staffSkillDataMock1); 
                setRoleSkill(roleSkillDataMock);
                console.error('Error fetching data:', error.message);
            }
        }

        fetchData()

    }, [staff_id, role]);

    useEffect(() => {
        const percentage = findMatchingSkillsPercentage(staffSkillArray, roleSkillArray);
        setSkillMatchPercentage(percentage);
    }, [staffSkillArray, roleSkillArray]);


    const skills_items = (roleSkillArray) => {
        roleSkillLen = roleSkillArray.length
        const rows = [...Array( Math.ceil(roleSkillLen / 7) )];
        console.log("rows", rows)
        const skillRows = rows.map( (row, idx) => roleSkillArray.slice(idx * 7, idx * 7 + 7) ); // 7 is number of items in each row
        let columns = []
        for (let i = 0; i < skillRows.length; i++) {
            columns.push(
                <div className='flex flex-row pb-6 gap-10'>
                    {skillRows[i].map( (skill) => {
                        return (
                            <Chip variant="outlined" value={skill} />
                    )})}
                </div>
            )
        }
        return (
            <div className='flex flex-col'>
                {columns}
            </div>
        )
    }
    
    const skills_match_items = (staffSkillArray, roleSkillArray, roleSkillLen) => {
        const rows = [...Array( Math.ceil(roleSkillLen / 7) )];
        const skillRows = rows.map( (row, idx) => roleSkillArray.slice(idx * 7, idx * 7 + 7) ); // 7 is number of items in each row
        let columns = []
        for (let i = 0; i < skillRows.length; i++) {
            columns.push(
                <div className='flex flex-row pb-6 gap-10'>
                    {skillRows[i].map( (skill) => {
                        const skillMatch = staffSkillArray.includes(skill)
                        const skillVariant = skillMatch ? "filled" : "outlined"
                        const skillClasses = skillMatch ? "rounded-full bg-violet-600" : "rounded-full"
                        const skillColor = skillMatch ? "white" : "red"
                                    
                        return (
                            <Chip variant={skillVariant} color={skillColor} className={skillClasses} value={skill}/>
                        )})}
                </div>
            )
        }
        return (
            <div className='flex flex-col'>
                {columns}
            </div>
        )
    }

    const findMatchingSkillsPercentage = (userSkillArray, roleSkillArray) => {
        const commonStrings = []
        var commonCounter = 0
        const numRoleSkill = roleSkillArray.length
    
        for (const roleSkill of roleSkillArray) {
            if (userSkillArray.includes(roleSkill)) {
                console.log("ROLE SKILL", roleSkill)
                commonCounter += 1
            }
        }
    
        return (commonCounter / numRoleSkill * 100).toFixed(2)
    } 

    return (
        <div className="w-32">
            <div className="p-6 bg-blue-500">
                <div className="border p-6 rounded-lg">
                    <div className="flex flex-col">
                        <div className='flex flex-col sm:flex-row'>
                            <Typography variant="normal" className="font-bold mb-6">
                                {role_listing.department} Department
                            </Typography>
                            <div className='flex flex-col mb-8'>
                                <div className='flex-col mb-4'>
                                    <Typography variant="h4">
                                        {role_listing.role_name}
                                    </Typography>
                                </div>
                                <div className='flex flex-row gap-10 w-full'>
                                    { skills_items(roleSkillArray, roleSkillLen) }
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <Typography variant="h4">
                                        Job description
                                    </Typography>
                                    <div className='flex-col mt-4'>
                                        <Typography variant="normal" className='font-normal'>
                                            {role_listing.description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col skillsMatch'>
                                <div className='flex flex-col mt-8 mb-8'>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h4">
                                                Skills Match
                                            </Typography>
                                        </div>
                                        {(!isNaN(skillMatchPercentage)) && <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {skillMatchPercentage}% Skills Matched
                                            </Typography>
                                        </div>
                                        }       
                                        <div className='flex-col mt-4'>
                                            <Progress value={skillMatchPercentage} />
                                        </div>
                                        <div className='flex-col'>
                                            <div className='flex flex-row gap-10'>
                                                {skills_match_items(staffSkillArray, roleSkillArray, roleSkillLen)}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex flex-row mt-8 mb-8 justify-between'>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Reporting Manager
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {role_listing.reporting_manager}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Opening Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {role_listing.opening_date}
                                            </Typography>
                                        </div>  
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h5">
                                                Closing Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {role_listing.closing_date}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row sm:flex-row justify-end'>
                                <div className='flex-col mt-8 mb-8'>
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
    );
}