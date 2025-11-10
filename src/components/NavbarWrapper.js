"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")
  return !isAdminRoute ? <Navbar /> : null
}