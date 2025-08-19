import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
<<<<<<< HEAD
  if (isConnected) return mongoose.connection

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    isConnected = true
    console.log("MongoDB connected")
    return mongoose.connection
=======
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Augmenter le timeout de sélection du serveur à 30 secondes
      socketTimeoutMS: 45000, // Augmenter le timeout des sockets à 45 secondes
    })
    isConnected = true
    console.log("MongoDB connected")
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
