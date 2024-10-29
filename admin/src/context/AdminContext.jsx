import { createContext, useState } from "react";

export const AdminContext = createContext()


const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback if undefined

    const value = {
        aToken,
        setAToken,
        backendUrl,
    }
    // console.log("URL:", import.meta.env.VITE_BACKEND_URL)
    // console.log("VITE_BACKEND_URL:", backendUrl);
    // console.log(import.meta.env);


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider