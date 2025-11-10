import { connectToDB } from './mongodb'

export default async function dbConnect() {
  return await connectToDB()
}
