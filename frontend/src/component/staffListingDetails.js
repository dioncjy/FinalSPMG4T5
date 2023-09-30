import React, { useState, useEffect } from 'react'
import { Typography, Button, Chip, Progress } from "@material-tailwind/react";


const user_skills = [
    "prototyping", "UX", "Communication Skills",
]

const listing_data = {
    "role_name": "uiux designer",
    "department" :"web application",
    "description": "asdf",
    "closing_date": "2023-12-23",
    "opening_date": "2023-09-09",
    "skills" : ["prototyping", "UX", "Figma", "Web Design", "English", "Communication Skills", "Communication Skills", "Communication Skills", "Communication Skills", "Communication Skills"],
    "reporting_manager": "Bajesh Ralan",
}

const user_skills_len = user_skills.length
const listing_skills_len = listing_data.skills.length
const skillMatchPerc = Math.round((user_skills_len) / (listing_skills_len) * 100)

const skills_items = () => {
    const rows = [...Array( Math.ceil(listing_skills_len / 7) )];
    const skillRows = rows.map( (row, idx) => listing_data.skills.slice(idx * 7, idx * 7 + 7) ); // 7 is number of items in each row
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
    
const skills_match_items = () => {
    const rows = [...Array( Math.ceil(listing_skills_len / 7) )];
    const skillRows = rows.map( (row, idx) => listing_data.skills.slice(idx * 7, idx * 7 + 7) ); // 7 is number of items in each row
    let columns = []
    for (let i = 0; i < skillRows.length; i++) {
        columns.push(
            <div className='flex flex-row pb-6 gap-10'>
                {skillRows[i].map( (skill) => {
                    const skillMatch = user_skills.includes(skill)
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


export default function StaffListingDetails(props) {
    const [roleListing, setRoleListing] = useState([]);
    const [userSkills, setUserSkills] = useState([]);

    // useEffect(() => {
    //     const getRoleListing = 'http://127.0.0.1:5000/roledetails/Cleaner'

    //     fetch(getRoleListing)
    //         .then((response) => response.json())
    //         .then ((data) => {
    //             setRoleListing(data)
    //             console.log(data)
    //         })

    //         .catch((error) => {
    //             console.error('Error fetching data:', error)
    //         })
    // }, []);

    // useEffect(() => {
    //     const getUserSkills = 'http://127.0.0.1:5000/getallrolelistings'

    //     fetch(getUserSkills)
    //         .then((response) => response.json())
    //         .then ((data) => {
    //             setRoleListing(data)
    //             console.log(data)
    //         })

    //         .catch((error) => {
    //             console.error('Error fetching data:', error)
    //         })
    // }, []);

    return (
        <div className="w-32">
            <div className="p-6 bg-blue-500">
                <div className="border p-6 rounded-lg">
                    <div className="flex flex-col">
                        <div className='flex flex-col sm:flex-row'>
                            <Typography variant="normal" className="font-bold mb-6">
                                {listing_data.department}
                            </Typography>
                            <div className='flex flex-col mb-8'>
                                <div className='flex-col mb-4'>
                                    <Typography variant="h4">
                                        {listing_data.role_name}
                                    </Typography>
                                </div>
                                <div className='flex flex-row gap-10 w-full'>
                                    { skills_items() }
                                </div>
                            </div>
                            <div className='flex flex-col border-t border-b border-blue-gray-50'>
                                <div className='flex-col mt-8 mb-8'>
                                    <Typography variant="h4">
                                        job description
                                    </Typography>
                                    <div className='flex-col mt-4'>
                                        <Typography variant="normal" className='font-normal'>
                                            {listing_data.description}
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
                                        <div className='flex-col mt-4'>
                                            <Typography variant="normal" className='font-normal'>
                                                {skillMatchPerc}% Skills Matched
                                            </Typography>
                                        </div>
                                        <div className='flex-col mt-4'>
                                            <Progress value={skillMatchPerc} />
                                        </div>
                                        <div className='flex-col'>
                                            <div className='flex flex-row gap-10'>
                                                {skills_match_items()}
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
                                                {listing_data.reporting_manager}
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
                                                {listing_data.opening_date}
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
                                                {listing_data.closing_date}
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

