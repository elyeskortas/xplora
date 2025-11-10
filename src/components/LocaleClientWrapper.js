"use client"

import React from "react"
import { useLocale } from "@/context/locale-context"

export default function LocaleClientWrapper({ children }) {
  const { locale } = useLocale()
  return (
    <div data-locale={locale} lang={locale}>
      {children}
    </div>
  )
}
