import React, { useState } from 'react';

function Login() {
  const [staffId, setStaffId] = useState(1); // 1 is staff rahaehs

  const toggleRole = () => {
    // change btw 2 and 1, 2 is HR
    setStaffId(staffId === 1 ? 2 : 1);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={toggleRole}>Toggle Role</button>
      <p>Logged in as {staffId === 1 ? 'Staff' : 'HR'}</p>
    </div>
  );
}

export default Login;