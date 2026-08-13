import mongoose from "mongoose";

const { Schema } = mongoose;

const inquirySchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "responded", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;