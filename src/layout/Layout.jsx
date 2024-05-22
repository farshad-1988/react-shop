import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import NavbarAdmin from '../admin/components/NavbarAdmin'
import NavTips from './NavTips'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './layoutComponents/Footer'

const Layout = () => {
    const { currentUser } = useContext(UserContext)


    return (
        <div>
            {currentUser?.uid === process.env.REACT_APP_ADMIN_UID ? <NavbarAdmin /> : (<><NavTips />
                <Navbar /></>)}
            <div style={{ minHeight: "100vh" }}>
                {<Outlet />}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
