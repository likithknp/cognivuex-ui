import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{display:"flex",height:"100vh"}}>
      <Sidebar />

      <div style={{flex:1,overflow:"auto"}}>
        <TopNavbar />

        <div style={{padding:"30px"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}