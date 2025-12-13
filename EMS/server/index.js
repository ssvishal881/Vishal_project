import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import salaryRouter from "./routes/salary.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import leaveRouter from "./routes/leave.js";
import employeeRouter from "./routes/employee.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded files (files saved in public/uploads will be reachable at http://localhost:PORT/<filename>)
app.use(express.static("public/uploads"));

// auth routes
app.use("/api/auth", authRouter);

// department routes
app.use("/api/department", departmentRouter);

// employee routes
app.use("/api/employee", employeeRouter);

// salary routes
app.use("/api/salary", salaryRouter);

// leave routes
app.use("/api/leave", leaveRouter);

// setting routes
app.use("/api/setting", settingRouter);

// dashboard routes
app.use("/api/dashboard", dashboardRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
