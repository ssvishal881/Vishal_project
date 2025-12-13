import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch departments!");
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.departments.map((dep, index) => ({
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));

          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to fetch departments!");
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(keyword)
    );
    setFilteredDepartments(filtered);
  };

  return (
    <div className="p-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="px-4 py-1 border rounded"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Add New Department
            </Link>
          </div>

          <DataTable columns={columns} data={filteredDepartments} pagination />
        </>
      )}
    </div>
  );
};

export default DepartmentList;
