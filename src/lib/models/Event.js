//@/lib/models/Event.js

import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  uniqueName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    default: "",
  },
  eventName: {
    type: String,
    default: "",
  },
  eventTiming: {
    type: String,
    default: "",
  },
  eventAbstract: {
    type: String,
    default: "",
  },
  eventDesp: {
    type: String,
    default: "",
  },
  flagship: {
    type: Boolean,
    default: false,
  },
  incharge: {
    type: String,
    default: "",
  },
  inchargeNumber: {
    type: String,
    default: "",
  },
});

// Prevent model overwrite during development
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
