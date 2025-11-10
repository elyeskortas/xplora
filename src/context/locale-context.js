"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"
import es from "@/locales/es.json"
import it from "@/locales/it.json"

export const LocaleContext = createContext()

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("en")
  const [messages, setMessages] = useState(en)

  // Load saved locale (if any) on first mount; default to English
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("locale")
        const nextLocale = saved || "en"
        setLocale(nextLocale)
        setMessages(nextLocale === "fr" ? fr : nextLocale === "es" ? es : nextLocale === "it" ? it : en)
      } catch {
        setLocale("en")
        setMessages(en)
      }
    }
  }, [])

  // When locale changes, persist and update dictionary
  useEffect(() => {
    if (typeof window !== "undefined") {
      try { localStorage.setItem("locale", locale) } catch {}
    }
    const dict = locale === "fr" ? fr : locale === "es" ? es : locale === "it" ? it : en
    setMessages(dict)
  }, [locale])

  const toggleLocale = () => setLocale((l) => (l === "en" ? "fr" : l === "fr" ? "es" : l === "es" ? "it" : "en"))
  const setLocaleExplicit = (l) => setLocale(l)

  return (
    <LocaleContext.Provider value={{ locale, messages, toggleLocale, setLocale: setLocaleExplicit }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
