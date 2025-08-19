import Navbar from "@/components/Navbar"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { AuthProvider } from "@/context/auth-context"
import BootstrapClient from "@/components/bootstrap-client"
import { Inter } from "next/font/google"
import ChatbotWidget from "@/components/ChatbotWidget"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vinylia",
  description: "Boutique en ligne de vente de vinyles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <BootstrapClient />

        {/* Définition des icônes SVG à usage global */}
        <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
          <symbol id="star-quality" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </symbol>
          <symbol id="fast-delivery" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12l18-9v18z" />
          </symbol>
          <symbol id="best-guarantee" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <path d="M10 16l5-5-1.5-1.5L10 13l-1.5-1.5L7 13l3 3z" fill="#fff" />
          </symbol>
          <symbol id="audio-preview" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </symbol>
        </svg>

        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              {children}
              <ChatbotWidget /> 
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}