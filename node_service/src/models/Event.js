const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  pipeline_id:   { type: Number, required: true },
  pipeline_name: { type: String, required: true },
  event_type:    {
    type: String,
    enum: ["run_started", "run_completed", "run_failed", "status_changed"],
    required: true
  },
  payload:    { type: mongoose.Schema.Types.Mixed, default: {} },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
