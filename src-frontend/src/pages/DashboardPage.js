import React from 'react'
import { useUserContext } from '../context/user_context'

const DashboardPage = () => {
    const { myUser } = useUserContext();

    return (
        <div>{`Hola, ${myUser.name}!`}</div>
    )
}

export default DashboardPage