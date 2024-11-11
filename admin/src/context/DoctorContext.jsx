import { createContext, useState } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    // if backendUrl can;'t fetch file
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const value = {
        dToken,
        setDToken,
        backendUrl,

    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider