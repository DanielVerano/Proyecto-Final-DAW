import React from 'react'
import { useUserContext } from "../context/user_context";

const ProtectedRoute = ({ children }) => {
    const { myUser } = useUserContext();

    if (!myUser) {
        return (
            <div>ProtectedRoute</div>
        )
    }

    return children;
}

export default ProtectedRoute