require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/webhooks", require("./routes/webhooks"));
app.use("/events",   require("./routes/events"));

app.get("/health", (_, res) => res.json({ status: "ok" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Node service running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch(err => console.error("MongoDB error:", err));
