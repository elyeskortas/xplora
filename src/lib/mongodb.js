import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
  if (isConnected) return mongoose.connection

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    isConnected = true
    console.log("MongoDB connected")
    return mongoose.connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
