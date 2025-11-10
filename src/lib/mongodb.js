import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
  if (isConnected) return mongoose.connection

  const uri = process.env.MONGODB_URI_XPLORA || process.env.MONGODB_URI

  try {
    await mongoose.connect(uri, {
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
