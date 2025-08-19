import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  vinylId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vinyl',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Chaque utilisateur a un seul panier
  },
  items: [cartItemSchema],
}, {
  timestamps: true,
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
