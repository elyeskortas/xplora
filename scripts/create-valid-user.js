// scripts/create-valid-user.js
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const uri = process.env.MONGODB_URI
const DB_NAME = "vinylia"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)))
}

async function run() {
  try {
    const firstName = await ask("Prénom de l'utilisateur: ")
    const lastName = await ask("Nom de l'utilisateur: ")
    const email = await ask("Email: ")
    const password = await ask("Mot de passe: ")

    const user = {
      firstName,
      lastName,
      email,
      password,
      role: "admin",
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

    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(DB_NAME)
    const users = db.collection("users")

    const existing = await users.findOne({ email: user.email.toLowerCase().trim() })
    if (existing) {
      console.log("❗ Cet email existe déjà")
      rl.close()
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

    rl.close()
  } catch (err) {
    console.error("Erreur:", err)
    rl.close()
  }
}

run()
