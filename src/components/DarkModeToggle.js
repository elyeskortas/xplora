"use client"

import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("system")

  // Initialize theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme")
      const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const next = saved || (preferDark ? 'dark' : 'light')
      applyTheme(next)
      setTheme(next)
    } catch {}
  }, [])

  const applyTheme = (t) => {
    const root = document.documentElement
    if (t === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('theme', t) } catch {}
  }

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-md border border-border hover:bg-secondary/60 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'} text-lg`}></i>
    </button>
  )
}
