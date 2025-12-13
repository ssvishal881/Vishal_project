import React from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar + Outlet section */}
      <div className="flex-1 ml-64 bg-gray-100 h-screen overflow-y-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
