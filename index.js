require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authenticationToken");
const { connectDB, connectFirebase } = require("./config/db");
const path = require("path");
const cronServices = require("./cronJobs/cronJobs");

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = "192.168.1.6";

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.json());

// Use morgan middleware for access logs
app.use(morgan("tiny"));

// Connect to mongoDB & firebase on application start.
connectDB();
connectFirebase();

// Initialize the cron job
//
// recurringCron.recurringMonthlyTasks();
// recurringCron.recurringMonthlyTasks();
// cronServices.unassignedTasks();

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "views", "index.html");

  res.sendFile(htmlFilePath);
});

// Routes

app.use("/auth", authRoutes);

// Protected route - just an example
app.get("/protected", authenticateToken, (req, res) => {
  const user = req.user;
  res.json({ message: "You have access to this protected route", user });
});

// Catch-all middleware for unsupported methods
app.use((req, res) => {
  res.status(405).json({
    error: "Method Not Allowed",
    message: "This endpoint does not support the requested method",
  });
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Bad JSON payload
    return res.status(400).json({ message: "Bad JSON payload" });
  }
  next(err);
});

// app.listen(PORT, IP_ADDRESS, () => {
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  // console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
