"use client"

import React from "react"
import { useLocale } from "@/context/locale-context"

export default function LanguageSwitcher() {
  const { locale, toggleLocale, messages } = useLocale()

  return (
    <div className="flex items-center space-x-2">
      <button onClick={toggleLocale} className="px-2 py-0.5 border rounded-md text-xs" title={messages?.switch_language || "Switch language"}>
        {locale.toUpperCase()}
      </button>
    </div>
  )
}
