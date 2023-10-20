import React, { useState, useEffect } from 'react';
import { Button, UserPlusIcon } from "@material-tailwind/react";
import ResultModal from "../component/applicationResultModal";
import { useNavigate, useLocation } from 'react-router-dom';

function StaffApplicationForm(props) {
    const staff_id = props.props.staff_id;
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const role = location.state && location.state.roleName;
    console.log(role)
    const openModal = () => {
        setIsModalOpen(true);
      };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/staff/${staff_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
          }
      } 
      fetchData(); 
    }, []);

    return (
        <div className="w-32">
            <div className="p-6">
                <div className="border p-6 rounded-lg">
                <form action="" method="post">
                    <div className="flex flex-col">
                        <h3>
                            Applying for {role}
                        </h3>
                        <p>
                            Web Application, Singapore
                        </p>
                        <hr />

                        <div className="py-2">
                            <label for="id">
                                <strong>Staff ID</strong>
                            </label>
                            <br />
                            {data && (<input type="text" name="id" id="id" className="border w-full rounded-md p-2" value={data.staff_id} readOnly />)}
                        </div>
                        <hr />

                        <div className="py-2">
                            <label for="name">
                                <strong>Applicant Name</strong>
                            </label>
                            <br />
                            {data && (<input type="text" name="name" id="name" className="border w-full rounded-md p-2" value={data.staff_fname} readOnly />)}
                        </div>
                        <hr />

                        <div className="py-2">
                            <label for="dept">
                                <strong>Department</strong>
                            </label>
                            <br />
                            {data && (<input type="text" name="dept" id="dept" className="border w-full rounded-md p-2" value={data.dept} readOnly />)}
                        </div>
                        <hr />

                        <div className="py-2">
                            <label for="comments">
                                <strong>Comments</strong>
                            </label>
                            <br />
                            <textarea
                                rows={4}
                                className="border rounded-md p-2 w-full"
                                placeholder="Fill in your comments"
                            />
                        </div>
                        <hr />
                        <div className="py-2 flex justify-between">
                            <Button className="bg-violet-600">Home</Button>
                            <Button onClick={openModal} className="bg-violet-600">Submit</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

            <ResultModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default StaffApplicationForm;
