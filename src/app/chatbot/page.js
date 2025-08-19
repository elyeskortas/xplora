import ChatbotClient from "./ChatbotClient"

export const metadata = {
  title: "Chatbot Vinylia",
  description: "Discutez avec l'assistant intelligent de Vinylia pour trouver vos vinyles préférés.",
}

export default function ChatbotPage() {
  return (
    <main className="container py-5">
      <ChatbotClient />
    </main>
  )
}
