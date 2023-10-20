import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
    const [selectedRole, setSelectedRole] = useState('');
    
    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole}}>
            { children }
        </RoleContext.Provider>
    )
}

export function useRoleContext() {
    return useContext(RoleContext);
}