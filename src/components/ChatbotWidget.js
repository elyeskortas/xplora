"use client"

import { useState } from "react"
import ChatbotClient from "@/app/chatbot/ChatbotClient"

export default function ChatbotWidget() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="chatbot-widget">
      {visible && (
        <div className="chatbot-panel">
          <ChatbotClient />
        </div>
      )}
      <button className="chatbot-toggle" onClick={() => setVisible((v) => !v)}>
        {visible ? "✖" : "💬"}
      </button>
      <style jsx>{`
        .chatbot-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .chatbot-panel {
          width: 360px;
          height: 520px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .chatbot-toggle {
          background: #111;
          color: #fff;
          border: none;
          padding: 12px 16px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 18px;
        }
      `}</style>
    </div>
  )
}