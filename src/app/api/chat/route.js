import { streamText, convertToModelMessages } from "ai"
import { groq } from "@ai-sdk/groq"
import { getAllVinyls } from "@/lib/actions/vinyls"

export async function POST(req) {
  console.log("API Chat: Route handler started. NODE_ENV:", process.env.NODE_ENV)
  try {
    const body = await req.json()
    const messages = body.messages

    console.log(
      "API Chat: Requête reçue. Messages bruts:",
      JSON.stringify(messages, null, 2), // Use JSON.stringify for full object content
      "Type:",
      typeof messages,
      "Is Array:",
      Array.isArray(messages),
    )

    let allVinyls = []
    try {
      allVinyls = await getAllVinyls()
      console.log(`API Chat: Fetched ${allVinyls.length} vinyls for RAG context.`)
    } catch (vinylFetchError) {
      console.error(
        "API Chat: Erreur lors de la récupération des vinyles (continuant sans contexte vinyle):",
        vinylFetchError,
      )
    }

    const vinylsContext = (allVinyls || [])
      .map((vinyl) => {
        const title = vinyl?.title || "Titre inconnu"
        const artist = vinyl?.artist || "Artiste inconnu"
        const category = vinyl?.category || "Catégorie non spécifiée"
        const price = typeof vinyl?.price === "number" ? vinyl.price.toFixed(2) : "Prix non spécifié"
        const stock = typeof vinyl?.stock === "number" ? vinyl.stock : "Stock non spécifié"

        return `- Titre: ${title}, Artiste: ${artist}, Catégorie: ${category}, Prix: ${price}€, Stock: ${stock}`
      })
      .join("\n")

    const systemPrompt = `
        Vous êtes Vinylia Bot, un assistant utile et amical spécialisé dans les vinyles.
        Votre rôle est de répondre aux questions des utilisateurs en vous basant sur les informations fournies sur les vinyles disponibles.
        Voici la liste des vinyles actuellement disponibles sur le site Vinylia :
        ${vinylsContext}

        Instructions :
        - Utilisez uniquement les informations fournies ci-dessus pour répondre aux questions sur les vinyles.
        - Si une question concerne un vinyle qui n'est pas dans la liste, ou si l'information demandée n'est pas disponible, indiquez-le poliment.
        - Répondez de manière concise et utile.
        - Si l'utilisateur pose une question générale (non liée aux vinyles du site), répondez en tant qu'assistant généraliste.
        - Ne mentionnez pas que vous avez reçu une "liste" ou des "données" de vinyles. Intégrez l'information naturellement.
        - Le prix est en euros (€).
      `

    const messagesArray = Array.isArray(messages) ? messages : []
    // IMPORTANT CHANGE: Convert system message to use 'parts' array
    const messagesWithContext = [{ role: "system", parts: [{ type: "text", text: systemPrompt }] }, ...messagesArray]

    console.log("API Chat: Messages avec contexte AVANT filtrage:", JSON.stringify(messagesWithContext, null, 2))
    console.log("API Chat: Type de messagesWithContext:", typeof messagesWithContext)
    console.log("API Chat: Est-ce que messagesWithContext est un Array?", Array.isArray(messagesWithContext))

    if (!Array.isArray(messagesWithContext)) {
      throw new Error(
        `messagesWithContext n'est pas un tableau. Type: ${typeof messagesWithContext}, Valeur: ${JSON.stringify(messagesWithContext)}`,
      )
    }

    const filteredMessages = messagesWithContext.filter((m, index) => {
      console.log(`API Chat: Début filtrage message ${index}:`, JSON.stringify(m, null, 2))
      if (!m || typeof m !== "object") {
        console.warn(`API Chat: Message ${index} est undefined, null ou non un objet. Exclu.`)
        return false
      }

      // For system messages, ensure they have parts
      if (m.role === "system") {
        if (
          !Array.isArray(m.parts) ||
          m.parts.length === 0 ||
          !m.parts[0] ||
          m.parts[0].type !== "text" ||
          typeof m.parts[0].text !== "string"
        ) {
          console.warn(`API Chat: Message système ${index} a un format de 'parts' invalide. Exclu.`)
          return false
        }
        return true // System messages are always included if well-formed
      }

      if (m.role === "user") {
        let contentToCheck = ""
        let hasValidContent = false

        // Prioritize m.content if it's a string (legacy or direct content)
        if (typeof m.content === "string") {
          contentToCheck = m.content
          hasValidContent = contentToCheck.trim() !== "" && contentToCheck.trim() !== "undefined"
        } else if (Array.isArray(m.content)) {
          // If m.content is an array (for multi-modal from AI SDK v5)
          const textPart = m.content.find((part) => part && part.type === "text" && typeof part.text === "string")
          if (textPart) {
            contentToCheck = textPart.text
            hasValidContent = contentToCheck.trim() !== "" && contentToCheck.trim() !== "undefined"
          }
        } else if (Array.isArray(m.parts)) {
          // This branch is for m.parts being an array (standard v5 format)
          const textPart = m.parts.find((part) => part && part.type === "text" && typeof part.text === "string")
          if (textPart) {
            contentToCheck = textPart.text
            hasValidContent = contentToCheck.trim() !== "" && contentToCheck.trim() !== "undefined"
          }
        }

        console.log(
          `API Chat: Message utilisateur ${index} - contentToCheck: '${contentToCheck}', hasValidContent: ${hasValidContent}`,
        )
        return hasValidContent
      }
      return true // Include other roles (assistant, tool, etc.)
    })

    console.log(
      "API Chat: Messages finaux envoyés au modèle (après filtrage):",
      JSON.stringify(filteredMessages, null, 2),
    )

    if (filteredMessages.length === 0) {
      console.warn("API Chat: Aucun message valide à envoyer au modèle après le filtrage et l'ajout du contexte.")
      return new Response(JSON.stringify({ error: "Aucun message valide à traiter." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("API Chat: Erreur: La variable d'environnement GROQ_API_KEY n'est pas définie.")
      return new Response(JSON.stringify({ error: "Clé API Groq manquante." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const result = await streamText({
      model: groq("llama3-8b-8192"),
      messages: convertToModelMessages(filteredMessages),
    })
    console.log("API Chat: Réponse du modèle AI reçue.")
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("API Chat: Erreur dans la route API du chat:", error)
    return new Response(JSON.stringify({ error: `Erreur interne du serveur: ${error.message}` }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
