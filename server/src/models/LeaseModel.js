import mongoose from "mongoose";

const { Schema } = mongoose;

const leaseSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    rent: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "expired", "terminated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Lease = mongoose.model("Lease", leaseSchema);

export default Lease;