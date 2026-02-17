// models/College.ts
import mongoose, { Schema } from "mongoose"

const collegeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: String,
    state: String,
    addedByUser: { type: Boolean, default: false },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.College ||
  mongoose.model("College", collegeSchema)
