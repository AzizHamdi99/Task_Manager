import React from 'react'

const Sidebar = () => {

    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div>


        </div>
    )
}

export default Sidebar
