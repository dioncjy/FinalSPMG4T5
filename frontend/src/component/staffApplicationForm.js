import React from 'react';
import { Button, UserPlusIcon } from "@material-tailwind/react";

export default function staffApplicationForm() {
    return (
        <div className="w-32">
            <div className="p-6 bg-blue-500">
            <div className="border p-6 rounded-lg">
                <div className="flex flex-col">
                    <h3>
                        Applying for 
                        {/* fill in dynamic data */}
                    </h3>
                    <p>
                        Web Application, Singapore
                    </p>
                    <hr/>

                    <div className="py-2">
                        <label for="id">
                            <strong>Staff ID</strong>
                        </label>
                        <br/>
                        <input type="text" name="id" id="id" className="border w-full rounded-md"></input>
                    </div>
                    <hr/>

                    <div className="py-2">
                        <label for="name">
                            <strong>Applicant Name</strong>
                        </label>
                        <br/>
                        <input type="text" name="name" id="name" className="border w-full rounded-md"></input>
                    </div>
                    <hr/>

                    <div className="py-2">
                        <label for="dept">
                            <strong>Department</strong>
                        </label>
                        <br/>
                        <input type="text" name="dept" id="dept" className="border w-full rounded-md"></input>
                    </div>
                    <hr/>

                    <div className="py-2">
                        <label for="country">
                            <strong>Country</strong>
                        </label>
                        <br/>
                        <input type="text" name="country" id="country" className="border w-full rounded-md"></input>
                    </div>
                    <hr/>

                    <div className="py-2">
                        <label for="comments">
                            <strong>Comments</strong>
                        </label>
                        <br/>
                        <textarea
                        rows={4}
                        className="border rounded-md p-2 w-full"
                        placeholder="Fill in your comments"
                        />
                    </div>
                    <hr/>
                    <div className="py-2 flex justify-between">
                        <Button className="bg-violet-600">Home</Button>
                        <Button className="bg-violet-600">Submit</Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

