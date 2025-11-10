"use client"

import React from "react"
import LocaleClientWrapper from "@/components/LocaleClientWrapper"
import ClientProviders from "@/components/ClientProviders"
import NavbarWrapper from "@/components/NavbarWrapper"
import ToasterLoaderClient from "@/components/ToasterLoaderClient"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation"

export default function AppClientShell({ children }) {
  const pathname = usePathname()
  return (
    <LocaleClientWrapper>
      <ClientProviders>
        <NavbarWrapper />
        <ToasterLoaderClient />
        {children}
        <Footer />
      </ClientProviders>
    </LocaleClientWrapper>
  )
}
