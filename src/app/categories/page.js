// src/app/categories/page.js
import { redirect } from "next/navigation"

export const revalidate = 0

export default function DisabledCategoriesIndex() {
  redirect("/")
}
