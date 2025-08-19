"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useRef, useEffect } from "react" // Importez useState, useRef, useEffect

export default function ChatbotClient() {
  console.log("ChatbotClient: Composant rendu côté client.")

  // Gérer l'état de l'input manuellement
  const [currentInput, setCurrentInput] = useState("") // Nouvelle variable d'état pour l'input
  const messagesEndRef = useRef(null) // Ajoutez useRef

  const { messages, isLoading, error, sendMessage } = useChat({
    api: "/api/chat",
  })

  // Logs pour vérifier les valeurs des props
  console.log("ChatbotClient: Valeur actuelle de 'currentInput' (manuelle):", currentInput)
  console.log("ChatbotClient: Type de 'setCurrentInput':", typeof setCurrentInput)
  console.log("ChatbotClient: 'setCurrentInput' est-il défini?", setCurrentInput !== undefined)
  console.log("ChatbotClient: Résultat complet de useChat:", { messages, isLoading, error, sendMessage }) // Log simplifié

  // Fonction de soumission
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log("Client-side: handleFormSubmit appelé !")

    const trimmedInput = String(currentInput).trim() // Utilisez currentInput

    console.log("Client-side: Valeur de l'input avant envoi (après trim):", trimmedInput)
    console.log("Client-side: Tableau des messages actuel avant envoi:", messages)

    if (trimmedInput) {
      sendMessage({ text: trimmedInput })
      console.log("Client-side: Message envoyé:", { text: trimmedInput })
      setCurrentInput("") // Vider l'input après l'envoi
    } else {
      console.log("Client-side: Tentative d'envoi d'un message vide, action empêchée.")
    }
  }

  // Fonction pour gérer le changement de l'input
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]) // Ajoutez useEffect

  return (
    <Card className="w-full max-w-2xl mx-auto h-[70vh] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-center">Chatbot Vinylia</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full pr-4">
          {messages.length > 0 ? (
            messages.map((m) => (
              <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <p className="font-semibold capitalize">{m.role === "user" ? "Vous" : "Vinylia Bot"}</p>
                  {m.parts.map((part, partIndex) => (
                    <span key={partIndex}>
                      {part.type === "text" ? part.text : null}
                      {/* Vous pouvez ajouter d'autres types de parties ici si nécessaire, par exemple pour les images */}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Dites bonjour à votre assistant Vinylia !
            </div>
          )}
          {isLoading && (
            <div className="text-center text-gray-500">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>{" "}
              Le bot réfléchit...
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              <i className="bi bi-exclamation-triangle"></i> Erreur: {error.message}
            </div>
          )}
        </ScrollArea>
        <div ref={messagesEndRef} /> {/* Ajoutez la référence messagesEndRef */}
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleFormSubmit} className="flex w-full space-x-2">
          <Input
            className="flex-1"
            value={currentInput} // Utilisez la nouvelle variable d'état
            placeholder="Posez une question sur les vinyles..."
            onChange={handleInputChange} // Utilisez la nouvelle fonction de gestion du changement
            disabled={isLoading}
            id="chat-input"
          />
          <Button type="submit" disabled={isLoading}>
            Envoyer
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
