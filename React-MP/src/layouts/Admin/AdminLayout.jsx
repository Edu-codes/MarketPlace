import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Side from "../../layouts/Admin/Sidebar";
import Header from "../../layouts/Admin/Header";
import { Box } from "@mui/material";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Side collapsed={collapsed} />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Header toggleSidebar={toggleSidebar} />
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
