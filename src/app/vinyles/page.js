// src/app/vinyles/page.js
import { redirect } from "next/navigation"

export const revalidate = 0

export default function DisabledVinylsPage() {
  redirect("/")
}