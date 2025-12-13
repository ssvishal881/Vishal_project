import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filterdLeaves, setFilterdLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilterdLeaves(data);
      }
    } catch (error) {
      alert("Failed to fetch leaves!");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const search = e.target.value.toLowerCase();
    const data = leaves.filter((row) =>
      row.employeeId.toLowerCase().includes(search)
    );
    setFilterdLeaves(data);
  };

  const filterdByButton = (status) => {
    const search = status.toLowerCase();
    const data = leaves.filter((row) =>
      row.status.toLowerCase().includes(search)
    );
    setFilterdLeaves(data);
  };

  return (
    <>
      {filterdLeaves ? (
        <div className="p-6">
          <div className="text-center mb-3">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />

            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterdByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterdByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterdByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <DataTable columns={columns} data={filterdLeaves} pagination />
        </div>
      ) : (
        <div>Loading.... </div>
      )}
    </>
  );
};

export default Table;
