import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${
                  leave.employeeId.userId.profileImage || ""
                }`}
                className="rounded-full border w-36 h-36 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            {/* Name */}
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Name:</p>
              <p className="font-medium">{leave.employeeId.userId.name}</p>
            </div>

            {/* Employee ID */}
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Employee ID:</p>
              <p className="font-medium">{leave.employeeId.employeeId}</p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Leave Type:</p>
              <p className="font-medium">{leave.leaveType}</p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Reason:</p>
              <p className="font-medium">{leave.reason}</p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Department:</p>
              <p className="font-medium">
                {leave.employeeId.department.dep_name}
              </p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Start Date:</p>
              <p className="font-medium">
                {new Date(leave.startDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">End Date:</p>
              <p className="font-medium">
                {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Status / Action */}
            <div className="flex items-center space-x-3 mb-2">
              <p className="text-lg font-bold">Status:</p>

              {leave.status === "Pending" ? (
                <div className="flex gap-3">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`text-lg font-semibold 
        ${leave.status === "Approved" ? "text-green-600" : "text-red-600"}`}
                >
                  {leave.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div> Loading.... </div>
      )}
    </>
  );
};

export default Detail;
