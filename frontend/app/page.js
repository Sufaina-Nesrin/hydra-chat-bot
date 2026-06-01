"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ModernChatbotUI() {
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Hi there! 👋 I'm here to help you find answers about company policies and employee guidelines.What would you like to know today?`,
    },
  ]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ||"http://127.0.0.1:8000" ;
  const sendMessage = async (input) => {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: chatHistory,
        }),
      });

      const data = await response.json();

      const botMessage = data.reply;

      setChatHistory((prev) =>
        [...prev, { role: botMessage, text: botMessage }].slice(-10),
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botMessage,
        },
      ]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const message = input;
    setChatHistory((prev) =>
      [...prev, { role: "user", text: input }].slice(-10),
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setInput("");

    sendMessage(message);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse">
              <span className="text-2xl">🤖</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Hydra AI Chatbot
              </h1>
              <p className="text-sm text-slate-300">
                Retrieval-Augmented AI Assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 p-4 md:p-6">
        <section className="flex flex-col backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[80vh]">
          <div className="border-b border-white/10 p-5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-cyan-500/30">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>

              <div>
                <h2 className="font-bold text-xl">Hydra Assistant</h2>
                <p className="text-sm text-cyan-300">Online • AI Ready</p>
              </div>
            </div>

            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm">
              Clear Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in duration-700`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-5 py-4 shadow-xl transition-all duration-300 hover:scale-[1.01] ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-br-md"
                      : "bg-white/10 backdrop-blur-xl border border-white/10 rounded-bl-md"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.role === "bot" && (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
                        🤖
                      </div>
                    )}

                    <div>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white/10 border border-white/10 rounded-3xl rounded-bl-md px-5 py-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4 md:p-6 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-3xl px-4 py-3 shadow-xl focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-300">
              <input
                value={input}
                disabled={loading}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                placeholder="Ask About the employment"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <button
                onClick={handleSubmit}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key == "Return") && !loading) {
                    handleSubmit();
                  }
                }}
                disabled={loading}
                className="px-5 md:px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send"
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 mt-3">
              Powered by RAG • FastAPI • Next.js • AI Embeddings
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
