import { NextResponse } from 'next/server';
import { connectToDB } from '@/src/lib/mongodb'; // Updated path
import Vinyl from '@/src/models/vinyl'; // Updated path
import { verifyToken } from '@/src/lib/auth'; // Updated path
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

// POST: Add item to cart (reserve stock)
export async function POST(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const decoded = verifyToken(token.value);
    if (!decoded) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }

    const { vinylId, quantity } = await request.json();

    console.log("API /api/cart POST: Données reçues - vinylId:", vinylId, ", quantity:", quantity);

    if (!vinylId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ message: "Données invalides" }, { status: 400 });
    }

    if (!ObjectId.isValid(vinylId)) {
      console.error("API /api/cart POST: ID de vinyle invalide (non-ObjectId):", vinylId);
      return NextResponse.json({ message: `ID de vinyle invalide (non-ObjectId): ${vinylId}` }, { status: 400 });
    }

    await connectToDB();
    const vinyl = await Vinyl.findById(vinylId);

    if (!vinyl) {
      return NextResponse.json({ message: "Vinyle non trouvé" }, { status: 404 });
    }

    if (vinyl.stock - vinyl.reservedStock < quantity) {
      return NextResponse.json({ message: "Stock insuffisant pour cet article." }, { status: 409 });
    }

    vinyl.reservedStock += quantity;
    vinyl.lastReservedAt = new Date();
    await vinyl.save();

    return NextResponse.json({ message: "Article ajouté au panier et stock réservé." }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier (API):", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}

// DELETE: Remove item from cart (release reserved stock)
export async function DELETE(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const decoded = verifyToken(token.value);
    if (!decoded) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }

    const { vinylId, quantity } = await request.json();

    console.log("API /api/cart DELETE: Données reçues - vinylId:", vinylId, ", quantity:", quantity);

    if (!vinylId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ message: "Données invalides" }, { status: 400 });
    }

    if (!ObjectId.isValid(vinylId)) {
      console.error("API /api/cart DELETE: ID de vinyle invalide (non-ObjectId):", vinylId);
      return NextResponse.json({ message: `ID de vinyle invalide (non-ObjectId): ${vinylId}` }, { status: 400 });
    }

    await connectToDB();
    const vinyl = await Vinyl.findById(vinylId);

    if (!vinyl) {
      return NextResponse.json({ message: "Vinyle non trouvé" }, { status: 404 });
    }

    vinyl.reservedStock = Math.max(0, vinyl.reservedStock - quantity);
    if (vinyl.reservedStock === 0) {
      vinyl.lastReservedAt = null;
    }
    await vinyl.save();

    return NextResponse.json({ message: "Article retiré du panier et stock libéré." }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors du retrait du panier (API):", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}
