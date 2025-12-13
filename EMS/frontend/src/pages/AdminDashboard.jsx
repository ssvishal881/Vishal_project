import React from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Navbar + Outlet section */}
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen overflow-y-auto">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
