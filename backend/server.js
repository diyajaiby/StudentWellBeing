const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const savedContentRoutes = require("./routes/savedContentRoutes");
const selfCareRoutes = require("./routes/selfCareRoutes");

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


// ✅ ADD THIS LINE (VERY IMPORTANT)
app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/saved", savedContentRoutes);
app.use("/api/selfcare", selfCareRoutes);
app.use("/api/categories", require("./routes/categoryRoutes"));


app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});