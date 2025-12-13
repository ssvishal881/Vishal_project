import User from "../models/User.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Old password is incorrect ❗" });
    }

    // Generate new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
      updatedAt: Date.now(),
    });

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully ✔" });
  } catch (error) {
    console.error("Password Update Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Server Error while changing password ❗",
      });
  }
};
