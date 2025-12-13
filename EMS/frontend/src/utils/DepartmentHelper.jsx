import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this department?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        onDepartmentDelete();
      } else {
        alert("Failed to delete department!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete department!");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
