<<<<<<< HEAD
// C:\Users\MSI\vinylia\src\models\vinyl.js
import mongoose from "mongoose"

const VinylSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, trim: true },          
    img: { type: String, trim: true },            
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true },       
    description: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    audioSample: { type: String, trim: true },    
    soundcloud: { type: String, trim: true },     
  },
  { timestamps: true },
)

VinylSchema.pre("save", function (next) {
  if (!this.image && this.img) this.image = this.img
  if (!this.audioSample && this.soundcloud) this.audioSample = this.soundcloud
  next()
})

const Vinyl = mongoose.models.Vinyl || mongoose.model("Vinyl", VinylSchema)
export default Vinyl
=======
import mongoose from 'mongoose';

const VinylSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  category: String,
  description: String,
  stock: Number,
  soundcloud: String,
});

const Vinyl = mongoose.models.Vinyl || mongoose.model('Vinyl', VinylSchema);

export default Vinyl;
>>>>>>> 1ce8cdf307fe0a2f6ecec13db8ef743e0b0fc372
