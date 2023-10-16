import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    ChevronUpDownIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Checkbox,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";


// const user_login = {
//     "username": "staff",
//     "password": "123456"
// }

const user_login = {
    "username": "hr",
    "password": "123456"
}

const filter_labels = ["departments", "roles"]

const filter_data = {
    "departments" : [
        "web application", "data analytics", "talent acquisition"
    ], 
    "roles" : [
        "uiux designer", "data analyst", "HR"
    ]
}

const data = [
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "HR",
        "department" :"talent acquisition",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "description": "asdf",
        "closing_date": "2023-06-23"
    }, 
    {
        "role_name": "HR",
        "department" :"talent acquisition",
        "description": "asdf",
        "closing_date": "2023-04-23"
    }, 
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "description": "asdf",
        "closing_date": "2023-07-23"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "description": "asdf",
        "closing_date": "2023-07-14"
    }, 
    {
        "role_name": "HR",
        "department" :"talent acquisition",
        "description": "asdf",
        "closing_date": "2023-07-2"
    }, 
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "description": "asdf",
        "closing_date": "2023-07-1"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "HR",
        "department" :"talent acquisition",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "description": "asdf",
        "closing_date": "2023-12-23"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "description": "asdf",
        "closing_date": "2023-07-23"
    }
]


export default function RoleTable() {
    const today = new Date().toISOString().split("T")[0];
    const [openMenu, setOpenMenu] = React.useState(false);
    // Track checkbox state
    const [roleFilters, setRoleFilters] = useState({});

    //dont ever manipulate role listings
    const [roleListings, setRoleListings] = useState([]);
    const [filteredRoleListings, setFilteredRoleListings] = useState([])

    const [filters, setFilters] = useState({})
    const [activeFilters, setActiveFilters] = useState({
        departments: [],
        roles: [],
    });
    

    useEffect(() => {
        const getAllRoleListings = 'http://127.0.0.1:5000/role_listing'

        fetch(getAllRoleListings)
            .then((response) => response.json())
            .then ((data) => {
                setRoleListings(data)
                setFilteredRoleListings(data)

                const uniqueDepartments = [...new Set(data.map((listing) => listing.department))];
                const uniqueRoles = [...new Set(data.map((listing => listing.role_name )))]
                setFilters(
                    {
                        departments: uniqueDepartments,
                        roles: uniqueRoles
                    }
                )
                                
                const initialRoleFilters = {};
                uniqueRoles.forEach((role) => {
                    initialRoleFilters[role] = false; // Initially, no checkboxes are checked
                });                

                setRoleFilters(initialRoleFilters);

            })

            .catch((error) => {
                console.error('Error fetching data:', error)

                // For test
                setFilteredRoleListings(data)
                setRoleListings(data)
                setFilters(
                    {
                        departments: filter_data.departments,
                        roles: filter_data.roles
                    }
                )

                const initialRoleFilters = {};
                filter_data.roles.forEach((role) => {
                    initialRoleFilters[role] = false; // Initially, no checkboxes are checked
                });                
                setRoleFilters(initialRoleFilters);

            })
    }, []);

    const sortRoleListings = (sortingDirection) => {
        const sortedListings = [...filteredRoleListings].sort((a, b) => {
            if (sortingDirection === 'ascending') {
              return new Date(a.closing_date) - new Date(b.closing_date);
            } else {
              return new Date(b.closing_date) - new Date(a.closing_date);
            }
          });

          setFilteredRoleListings(sortedListings);
    }

    const onFilterChange = (category, item) => {
        const updatedFilters = { ...activeFilters };
        
        // Check if the elected item is already in the filters
        if (category === 'departments' || category === 'roles') {
            
            if (updatedFilters[category].includes(item)) {
                // If it is inside remove
                updatedFilters[category] = updatedFilters[category].filter((value) => value !== item);
            } else {
                // else add
                updatedFilters[category].push(item);
            }
        }
    
        // Update the activeFilters state with the new filters
        setActiveFilters(updatedFilters);

        setRoleFilters((prevRoleFilters) => ({
            ...prevRoleFilters,
            [item]: !prevRoleFilters[item], // Toggle the checkbox state
        }));

        if (
            Object.values(updatedFilters).every((filterItems) => filterItems.length === 0)
        ) {
            // If updatedFilters is empty, return all role listings
            setFilteredRoleListings(roleListings);
            return;
        }
    
        // Filter the roleListings based on the selected filters
        const filteredListings = roleListings.filter((listing) => {
            console.log(updatedFilters)
            // Check if the listing matches all selected filters
            return Object.entries(updatedFilters).some(([filterCategory, filterItems]) => {

                if (filterCategory === 'departments') {
                    console.log(filterItems.includes(listing.department))
                    return filterItems.includes(listing.department);
                }
                if (filterCategory === 'roles') {
                    return filterItems.includes(listing.role_name);
                }
                return false; // Add more filter categories as needed
            });
        });

        // Update the displayed roleListings with the filtered list
        setFilteredRoleListings(filteredListings);
      };

    const navigate = useNavigate();

    const handleClickStaff = (role) => {
        navigate(`/listingPage/${role.listing_id}`, { state: { role } });
    }

    const handleAddStaff = () => {
        navigate(`/addRolePage`);
    }

    const handleEditStaff = (role) => {
        console.log(role)
        navigate(`/editRolePage/${role.role_name}`, { state: { role } });
    }

    // const handleClickAddHR = (role) => {
    //     navigate(`/listingPage/${role.listing_id}`, { state: { role } });
    // }

    const addButton = () => {
        if (user_login.username === "hr") {
            return (
                <div className="flex flex-col sm:flex-row items-end">
                    <Button className="flex items-center p-6 bg-violet-600" size="sm" onClick={() => {handleAddStaff()}}>
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                        Add member
                    </Button>
                </div>
            )
        }
    }


    return (
        <Card className="w-10/12" style={{margin: '2rem',padding: '1rem'}}>
            <CardHeader floated={false} shadow={false} className="rounded-none px-6">
                <div className="mb-8 flex flex-row items-center justify-between">
                    <div className="flex-col">
                        <Typography variant="h5" color="blue-gray">
                            Members list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all members
                        </Typography>
                    </div>
                    {addButton()}
                </div>
                <div className="flex flex-row justify-between relative pb-6 border-b border-blue-gray-50">
                    <div className="sorting flex flex-col items-center ">
                        <Menu dismiss={{itemPress:false}} allowHover>
                            <MenuHandler>
                                <Button
                                    variant="text"
                                    className="flex items-center text-base font-normal capitalize"
                                    >
                                        <div className='flex flex-row w-24 items-center justify-between'>
                                            <Typography variant="h6" className="font-normal">
                                                Sort By
                                            </Typography>
                                            <ChevronUpDownIcon
                                                strokeWidth={2.5}
                                                className={`w-4 transition-transform ${
                                                openMenu ? "rotate-180" : ""
                                                }`}
                                            />
                                        </div>
                                </Button>
                            </MenuHandler>
                            <MenuList className="flex flex-col">
                                <MenuItem className="p-0">
                                    <Button variant="text" color="blue-gray" ripple="light" className="flex items-center" onClick={() => sortRoleListings('ascending') }>
                                        <Typography variant="h6" className="font-normal">
                                            Ascending (Closing Date)
                                        </Typography>
                                        <ChevronUpIcon strokeWidth={2.5} className="w-4" />
                                    </Button>
                                </MenuItem>
                                <MenuItem className="p-0">
                                    <Button variant="text" color="blue-gray" ripple="light" className="flex items-center" onClick={() => sortRoleListings('descending')}>
                                        <Typography variant="h6" className="font-normal">
                                            Descending (Closing Date)
                                        </Typography>
                                        <ChevronDownIcon strokeWidth={2.5} className="w-4" />
                                    </Button>       
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    <div className="flex items-center">
                        <input
                        className="rounded"
                        placeholder='Start Searching...'
                        />
                    </div>

                    <div className="filtering flex flex-col items-center ">
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
                                    const roles = filters[category];
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
                                        {roles.map((role) => (
                                        <MenuItem key={role} className="p-2">
                                            <label htmlFor={role} className="flex cursor-pointer items-center gap-2 p-2">
                                            <Checkbox
                                                checked={roleFilters[role]}
                                                ripple={false}
                                                id={role}
                                                containerProps={{ className: "p-0" }}
                                                className="hover:before:content-none"
                                                onChange={() => onFilterChange(category, role)}
                                            />
                                            {role}
                                            </label>
                                        </MenuItem>
                                        ))}
                                    </Card>
                                    );
                                })}
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </CardHeader>


            <CardBody className="overflow-scroll p-6">
                <div className="flex flex-col my-4">
                    {filteredRoleListings.map((role, index) => {
                        // const isFirst = index === 0;
                        // const isLast = index === data.length - 1;
                        // const classes = isLast
                        //     ? "flex flex-row p-4 items-center justify-between"
                        //     : isFirst
                        //     ? "flex flex-row p-4 items-center border-t border-blue-gray-50 justify-between"
                        //     : "flex flex-row p-4 items-center border-b border-blue-gray-50 justify-between";
                        if (user_login.username === "staff" && role.closing_date >= today) {
                            return (
                                // <div className={classes}>
                                <div className="flex flex-row p-4 items-center justify-between">
                                    <button onClick={() => {handleClickStaff(role)}} className="flex flex-col w-full">
                                        <div className="flex flex-col mt-4">
                                            <Typography variant="h4" color="blue-gray" className="font-bold">
                                                {role.department} department
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col">
                                            <Typography variant="h6" color="blue-gray" className="font-bold">
                                                {role.role_name}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col mt-2 mb-4">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                {role.description}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col mt-2 mb-4">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                {role.closing_date}
                                            </Typography>
                                        </div>
                                    </button>
                                    <div className="relative flex flex-col">
                                        <div className="relative flex justify-end top-0">
                                            <Button className="flex px-6 py-3" variant="outlined" size="sm">
                                                <HeartIcon className="h-4 w-4 place-self-end" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                        )} else if (user_login.username === "hr") {
                            return (
                                <div className="flex flex-row p-4 items-center justify-between">
                                    <button className="flex flex-col w-full">
                                        <div className="flex flex-col mt-4">
                                            <Typography variant="h4" color="blue-gray" className="font-bold">
                                                {role.department} department
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col">
                                            <Typography variant="h6" color="blue-gray" className="font-bold">
                                                {role.role_name}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col mt-2 mb-4">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                {role.description}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col mt-2 mb-4">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                {role.closing_date}
                                            </Typography>
                                        </div>
                                    </button>
                                    <div className="relative flex flex-col">
                                    <div className="relative flex justify-end top-0">
                                        <Button className="flex px-6 py-3" variant="outlined" size="sm" onClick={() => {handleEditStaff(role)}}>
                                            <PencilIcon className="h-4 w-4 place-self-end" />
                                        </Button>
                                    </div>
                                        <Button className="flex px-6 py-3 items-center" variant="text" size="sm">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                View Applicants
                                            </Typography>
                                        </Button>    
                                    </div>
                                </div>
                    )}})}

                </div>
            </CardBody>

    
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                    Previous
                </Button>
                <Button variant="outlined" size="sm">
                    Next
                </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
