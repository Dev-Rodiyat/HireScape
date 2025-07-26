const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "application_submitted",
        "application_status_updated",
        "job_posted",
        "job_closed",
        "message",
        "general",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
