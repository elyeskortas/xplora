import mongoose from 'mongoose'
import crypto from 'crypto'

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tokenHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true })

// static helper to create a token (returns plain token, stores hash)
resetTokenSchema.statics.createToken = async function (userId, ttlSeconds = 3600) {
  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000)
  await this.create({ userId, tokenHash, expiresAt })
  return token
}

resetTokenSchema.statics.consumeToken = async function (token) {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const doc = await this.findOne({ tokenHash })
  if (!doc) return null
  if (doc.expiresAt < new Date()) {
    await doc.deleteOne()
    return null
  }
  const userId = doc.userId
  await doc.deleteOne()
  return userId
}

const ResetToken = mongoose.models.ResetToken || mongoose.model('ResetToken', resetTokenSchema)
export default ResetToken
