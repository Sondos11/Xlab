const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
var routes = require("./routes/routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

mongoose.connect(
  "mongodb+srv://mahmoud1499:Admin_123@meal-planner.bk6jdu7.mongodb.net/xlab",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("DB Connecteddddd");
});

app.listen(8086, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("port Connecteddddd 8086");
  }
});

app.use(express.json());
app.use(routes);
