import { Inter } from "next/font/google"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import { LocaleProvider } from "@/context/locale-context"
import AppClientShell from "./AppClientShell"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tunisia Xplora",
  description: "Tunisia Xplora – Circuits, excursions, VIP private trips and day tours across Tunisia.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        {/* SVG sprite placeholder if needed by components */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}></svg>
        <LocaleProvider>
          <AppClientShell>
            {children}
          </AppClientShell>
        </LocaleProvider>
      </body>
    </html>
  )
}