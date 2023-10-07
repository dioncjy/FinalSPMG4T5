import React, { useState, useEffect } from 'react';
import { Button, UserPlusIcon } from "@material-tailwind/react";

function StaffApplicationForm() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:5000/staff/130001");
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
            <div className="p-6 bg-blue-500">
                <div className="border p-6 rounded-lg">
                <form action="" method="post">
                    <div className="flex flex-col">
                        <h3>
                            Applying for
                            {/* fill in dynamic data */}
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
                            <Button className="bg-violet-600">Submit</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StaffApplicationForm;
