
import HeaderCliente from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"



const ClientLayout= () =>
    {

   
    return (
        <>

            <HeaderCliente />

            <Outlet />

            <Footer />
        </>
    )
}

export default ClientLayout