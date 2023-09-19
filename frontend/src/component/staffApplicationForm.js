import React from 'react';

function staffApplicationForm() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border p-6 rounded-lg">
                <h3>
                    Applying for 
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
            </div>

        </div>
    );
}

export default staffApplicationForm;