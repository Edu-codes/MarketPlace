import { Sidebar } from "react-pro-sidebar";
import SidebarAdmin from "../../features/SidebarAdmin";

function Side({ collapsed }) {
  return (
    <Sidebar
      collapsed={collapsed} // 🔹 Aquí está el control del colapso
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <SidebarAdmin />
    </Sidebar>
  );
}

export default Side;
