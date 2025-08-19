// scripts/create-valid-user.js
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const uri = process.env.MONGODB_URI
const DB_NAME = "vinylia"

const user = {
  firstName: "Ahmed",
  lastName: "Vinylia",
  email: "elyeskortas007@gmail.com",
  password: "Vinylia@123", // Ce mot de passe sera hashé
  role: "user",
  isVerified: true,
  phone: null,
  avatar: null,
  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "",
  },
}

async function run() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(DB_NAME)
    const users = db.collection("users")

    const existing = await users.findOne({ email: user.email.toLowerCase().trim() })
    if (existing) {
      console.log("❗ Cet email existe déjà")
      return
    }

    const hashed = await bcrypt.hash(user.password, 10)

    await users.insertOne({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase().trim(),
      password: hashed,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("✅ Utilisateur inséré avec succès.")
    console.log("➡️ Connecte-toi avec :", user.email, "/", user.password)
  } catch (err) {
    console.error("Erreur:", err)
  } finally {
    await client.close()
  }
}

run()