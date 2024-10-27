import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState('')
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    
    // Debug log to check if backendUrl is loaded correctly
    console.log('Backend URL from .env:', backendUrl);
    console.log('All Environment Variables:', import.meta.env);
    console.log('Testing Backend URL:', import.meta.env.VITE_BACKEND_URL);
    console.log('Test Variable:', import.meta.env.VITE_TEST_VAR);



    const value = {
        aToken, setAToken,
        backendUrl,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider