import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterdEmployee, setFilterdEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            dep_name: emp.department ? emp.department.dep_name : "",
            name: emp.userId ? emp.userId.name : "",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${
                  emp.userId ? emp.userId.profileImage : ""
                }`}
                alt={emp.userId ? emp.userId.name : "profile"}
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployee(data);
          setFilterdEmployees(data);
        }
      } catch (error) {
        alert("Failed to fetch departments!");
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // filter handler must be outside useEffect and use 'e'
  const handleFilter = (e) => {
    const keyword = e.target.value || "";
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterdEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-1 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filterdEmployee}
          pagination
          progressPending={empLoading}
        />
      </div>
    </div>
  );
};

export default List;
