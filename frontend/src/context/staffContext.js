// StaffContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const StaffContext = createContext();

export function StaffProvider({ children }) {
  const [staffId, setStaffId] = useState(() => {
    // Initialize staffId from local storage or default to 1
    const storedStaffId = localStorage.getItem('staffId');
    return storedStaffId ? parseInt(storedStaffId, 10) : 1;
  });

  const toggleStaffId = () => {
    // Toggle staffId and update local storage
    const newStaffId = staffId === 1 ? 2 : 1;
    setStaffId(newStaffId);
    localStorage.setItem('staffId', newStaffId.toString());
  };

  return (
    <StaffContext.Provider value={{ staffId, toggleStaffId }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaff() {
  return useContext(StaffContext);
}
