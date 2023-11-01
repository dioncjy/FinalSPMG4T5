import React, { useState, useEffect } from 'react'
import { Typography, Button, Chip, Progress } from "@material-tailwind/react";
import { useLocation, useNavigate } from 'react-router-dom';

// Static data for error handling
const staffSkillDataMock1 = {
    "staff_id": 1,
    "skill_name": "coding"
}

// Static data for error handling
const roleSkillDataMock = {
    "role_name": "Product Manager",
    "skill_name": "managing"
}

// Data used for local testing

// const user_skills = [
//     "prototyping", "UX", "Communication Skills",
// ]
// const role_listing = {
//     "listing_id": 1,
//     "role_name": "Product Manager",
//     "department" :"IT",
//     "description": "Manage products. This is the description",
//     "closing_date": "2023-12-23",
//     "opening_date": "2023-09-09",
//     "reporting_manager": "Bajesh Ralan",
// }

// const roleSkillArrayMock = [
//     "managing"
// ]


// const staffSkillArrayMock1 = [
//     "coding"
// ]

// // staff_id 2 100% can apply 
// const staffSkillDataMock2 = {
//     "staff_id": 2,
//     "skill_name": "managing"
// }

// const staffSkillArrayMock2 = [
//     "managing"
// ]


export default function StaffListingDetails(props) {
    const staff_id = props.props.staff_id
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
    const roleName = role.role_name
    const navigate = useNavigate();
    const handleClickApply = (role) => {
        navigate(`/staffApplicationForm`, { state: { role } });
    }
    
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
                setStaffSkillArray(staffSkillData.staff_skill)

                setRoleSkill(roleSkillData);
                setRoleSkillArray(roleSkillData.skill_name)

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
        const rows = [...Array( Math.ceil(roleSkillLen / 2) )];
        const skillRows = rows.map( (row, idx) => roleSkillArray.slice(idx * 2, idx * 2 + 2) ); // 7 is number of items in each row
        let columns = []
        for (let i = 0; i < skillRows.length; i++) {
            columns.push(
                <div className='flex flex-row pb-6 gap-10'>
                    {skillRows[i].map( (skill) => {
                        return (
                            <Chip variant="outlined" value={skill} size="sm" />
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
        const rows = [...Array( Math.ceil(roleSkillLen / 2) )];
        const skillRows = rows.map( (row, idx) => roleSkillArray.slice(idx * 2, idx * 2 + 2) ); // 7 is number of items in each row
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
                            <Chip variant={skillVariant} color={skillColor} className={skillClasses} value={skill} size="sm"/>
                        )})}
                </div>
            )
        }
        return (
            <div className='flex flex-col max-w-sm-50'>
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
                commonCounter += 1
            }
        }
    
        return (commonCounter / numRoleSkill * 100).toFixed(2)
    } 

    return (
        <div className="w-10/12">
            <div className="p-6 bg-blue-500">
                <div className="border p-6 rounded-lg">
                    <div className="flex flex-col">
                        <div className='flex flex-col sm:flex-row'>
                            <Typography variant="normal" className="font-bold mb-6">
                                {roleListing.department} Department
                            </Typography>
                            <div className='flex flex-col mb-8'>
                                <div className='flex-col mb-4'>
                                    <Typography variant="h4">
                                        {roleListing.role_name}
                                    </Typography>
                                </div>
                                <div className='flex-col mb-4'>
                                    
                                    <Typography variant="h6">
                                        Skills Required for this role
                                    </Typography>
                                </div>
                                <div className='flex flex-row gap-10'>
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
                                            {roleListing.role_description}
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
                                            <Typography variant="h4">
                                                Reporting Manager
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {roleListing.reporting_manager}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h4">
                                                Opening Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {roleListing.opening_date}
                                            </Typography>
                                        </div>  
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="h4">
                                                Closing Date
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {roleListing.closing_date}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row sm:flex-row justify-end'>
                                <div className='flex-col mt-8 mb-8'>
                                        <Button onClick={() => {handleClickApply(role)}} className="flex items-center p-6 bg-violet-600" size="sm">
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