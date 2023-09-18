import React from 'react'
import {
    ChevronUpDownIcon,
    ChevronDownIcon,
    ChevronUpIcon
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

// const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

const filter_labels = ["departments", "roles"]

const filter_data = {
    "departments" : [
        "web application", "data analytics", "talent acquisition"
    ], 
    "roles" : [
        "uiux designer", "data analyst", "HR"
    ]
}

const dummy_data = [
    {
        "role_name": "uiux designer",
        "department" :"web application",
        "role_description": "asdf",
        "application_date": "sgsadf"
    }, 
    {
        "role_name": "data analyst",
        "department" :"data analytics",
        "role_description": "asdf",
        "application_date": "sgsadf"
    }, 
    {
        "role_name": "HR",
        "department" :"talent acquisition",
        "role_description": "asdf",
        "application_date": "sgsadf"
    }, 
]

export default function RoleTable() {
    const [openMenu, setOpenMenu] = React.useState(false);

    return (
        <Card className="w-10/12">
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
                    <div className="flex flex-col sm:flex-row items-end">
                        {/* <Button variant="outlined"size="sm">
                            view all
                        </Button> */}
                        <Button className="flex items-center p-6 bg-violet-600" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                            Add member
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row justify-between relative">
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
                                    <Button variant="text" color="blue-gray" ripple="light" className="flex items-center">
                                        <Typography variant="h6" className="font-normal">
                                            Ascending
                                        </Typography>
                                        <ChevronUpIcon strokeWidth={2.5} className="w-4" />
                                    </Button>
                                </MenuItem>
                                <MenuItem className="p-0">
                                    <Button variant="text" color="blue-gray" ripple="light" className="flex items-center">
                                        <Typography variant="h6" className="font-normal">
                                            Descending
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
                                {filter_labels.map((categories) => {
                                    const items = filter_data[categories];
                                    const cat_count = items.length;
                                    console.log(items)
                                    return (
                                        <Card
                                        id={categories}
                                        color="black"
                                        shadow={false}
                                        variant="gradient"
                                        className="col-span-3 flex flex-col p-2 place-items-center rounded-md hover:bg-violet-200 hover:outline-none"
                                    >
                                        <Typography variant="h6">
                                            {categories}
                                        </Typography>
                                        {items.map((item, i) => {
                                            return (
                                                <MenuItem className="p-2">
                                                    <label
                                                        htmlFor={item}
                                                        className="flex cursor-pointer items-center gap-2 p-2"
                                                    >
                                                        <Checkbox
                                                            ripple={false}
                                                            id={item[i]}
                                                            containerProps={{ className: "p-0" }}
                                                            className="hover:before:content-none"
                                                        />
                                                        {item}
                                                    </label>
                                                </MenuItem>
                                            )
                                        })}
                                        </Card>
                                        )})}
                            </MenuList>
                        </Menu>
                    </div>

                </div>
            </CardHeader>
            <CardBody className="overflow-scroll p-6">
                <div className="flex flex-col my-4">
                    {dummy_data.map((data, index) => {
                        const isFirst = index === 0;
                        const isLast = index === dummy_data.length - 1;
                        const classes = isLast
                            ? "flex flex-row p-4 items-center justify-between"
                            : isFirst
                            ? "flex flex-row p-4 items-center border-t border-blue-gray-50 justify-between"
                            : "flex flex-row p-4 items-center border-b border-blue-gray-50 justify-between";

                            return (
                                
                                <div className={classes}>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col mt-4">
                                            <Typography variant="h6" color="blue-gray" className="font-bold">
                                                {data.department}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col">
                                            <Typography variant="h4" color="blue-gray" className="font-bold">
                                                {data.role_name}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col mt-2 mb-4">
                                            <Typography variant="normal" color="blue-gray" className="font-normal">
                                                {data.role_description}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col">
                                        <div className="relative flex justify-end top-0">
                                            <Button className="flex px-6 py-3" variant="outlined" size="sm">
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
                    )})}

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

// <table className="mt-4 w-full min-w-max table-auto text-left">
//                     <thead>
//                         <tr>
//                         {TABLE_HEAD.map((head, index) => (
//                             <th
//                             key={head}
//                             className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                             >
//                             <Typography
//                                 variant="h6"
//                                 color="blue-gray"
//                                 className="flex font-bold items-center justify-between gap-2 leading-none opacity-70"
//                             >
//                                 {head}{" "}
//                                 {index !== TABLE_HEAD.length - 1 && (
//                                 <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
//                                 )}
//                             </Typography>
//                             </th>
//                         ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {TABLE_ROWS.map(
//                         ({ img, name, email, job, org, online, date }, index) => {
//                             const isLast = index === TABLE_ROWS.length - 1;
//                             const classes = isLast
//                             ? "p-4"
//                             : "p-4 border-b border-blue-gray-50";

//                             return (
//                             <tr key={name}>
//                                 <td className={classes}>
//                                     <div className="flex items-center gap-3">
//                                         <Avatar src={img} alt={name} size="sm" />
//                                         <div className="flex flex-col">
//                                             <Typography
//                                                 variant="small"
//                                                 color="blue-gray"
//                                                 className="font-normal"
//                                             >
//                                                 {name}
//                                             </Typography>
//                                             <Typography
//                                                 variant="small"
//                                                 color="blue-gray"
//                                                 className="font-normal opacity-70"
//                                             >
//                                                 {email}
//                                             </Typography>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className={classes}>
//                                     <div className="flex flex-col">
//                                         <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal"
//                                         >
//                                         {job}
//                                         </Typography>
//                                         <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal opacity-70"
//                                         >
//                                         {org}
//                                         </Typography>
//                                     </div>
//                                 </td>
//                                 <td className={classes}>
//                                     <div className="w-max">
//                                         <Chip
//                                         variant="ghost"
//                                         size="sm"
//                                         value={online ? "online" : "offline"}
//                                         color={online ? "green" : "blue-gray"}
//                                         />
//                                     </div>
//                                 </td>
//                                 <td className={classes}>
//                                     <Typography
//                                         variant="small"
//                                         color="blue-gray"
//                                         className="font-normal"
//                                     >
//                                         {date}
//                                     </Typography>
//                                 </td>
//                                 <td className={classes}>
//                                 <Tooltip content="Edit User">
//                                     <IconButton variant="text">
//                                         <PencilIcon className="h-4 w-4" />
//                                     </IconButton>
//                                 </Tooltip>
//                                 </td>
//                             </tr>
//                             );
//                         },
//                         )}
//                     </tbody>
//                 </table>
