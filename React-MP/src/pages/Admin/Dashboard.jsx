import BtnLogOut from "../../components/Button/BtnLogOut"
import Side from "../../layouts/Sidebar"
import Header from "../../layouts/Header"
import { Box } from "@mui/material"

export default function Dashboard() {
    return (
        <>
            <Box sx={{ display: "flex", height: "100vh"}}>
                {/* Sidebar */}
                <Box>
                    <Side />
                </Box>
            </Box>

            {/* Main content area */}
            <Box sx={{
                flex: 1,
                backgroundColor: '#f3f4f7',
            }}>
                <Header />

                {/* Contenido debajo del Header */}
                <Box sx={{ padding: 2, }}>

                    <h1>Pestaña admin</h1>
                    <BtnLogOut />
                </Box>
            </Box>
        </>
    )
}
