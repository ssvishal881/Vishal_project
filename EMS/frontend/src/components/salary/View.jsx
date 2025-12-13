import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalareis = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSalaries(response.data.salary || []);
      setFilteredSalaries(response.data.salary || []);
    } catch (error) {
      alert("Salary not found! ID must be EmployeeID / userId not Mongo _id");
    }
  };

  useEffect(() => {
    fetchSalareis();
  }, []);

  const filterSalaries = (q) => {
    const data = salaries.filter((s) =>
      (s.employeeId?.employeeId || "").toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(data);
  };

  return filteredSalaries === null ? (
    <div>Loading ...</div>
  ) : (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={(e) => filterSalaries(e.target.value)}
        />
      </div>

      {filteredSalaries.length ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Allowance</th>
              <th className="px-6 py-3">Deduction</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((s) => (
              <tr key={s._id} className="bg-white border-b">
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{s?.employeeId?.employeeId}</td>
                <td className="px-6 py-3">{s.basicSalary}</td>
                <td className="px-6 py-3">{s.allowances}</td>
                <td className="px-6 py-3">{s.deductions}</td>
                <td className="px-6 py-3">{s.netSalary}</td>
                <td className="px-6 py-3">
                  {new Date(s.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default View;
