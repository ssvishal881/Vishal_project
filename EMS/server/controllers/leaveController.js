import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
    });

    await newLeave.save();
    return res
      .status(200)
      .json({ success: true, message: "Leave Applied Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: id });
    } else {
      if (!leaves || leaves.length === 0) {
        const employee = await Employee.findOne({ userId: id });
        if (!employee)
          return res
            .status(404)
            .json({ success: false, message: "Employee not found!" });

        leaves = await Leave.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Leave fetch server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Leave fetch server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Leave detail fetch error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave)
      return res
        .status(404)
        .json({ success: false, error: "Leave not found!" });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Update failed" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
