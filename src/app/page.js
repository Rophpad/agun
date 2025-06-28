"use client";

// pages/index.js or app/page.js (depending on your Next.js version)
import { useState, useEffect } from "react";
import Head from "next/head";

export default function BTCHackMessenger() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  const [userBalance, setUserBalance] = useState(1000);
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessage, setLastMessage] = useState("");

  const messageLimit = 10;
  const penalites = {
    heureInterdite: 100,
    spam: 50,
    mauvaisMot: 75,
    depassement: 30,
  };
  const forbiddenWords = ["violence", "injures"];

  const updateNotification = (msg) => {
    setNotification(msg ? `${msg} | Solde : ${userBalance} sats` : "");
  };

  const deductPenalty = (amount) => {
    if (userBalance < amount) return false;
    setUserBalance((prev) => prev - amount);
    return true;
  };

  const displayMessage = (username, msg) => {
    const newMessage = {
      id: Date.now(),
      username: username || "Anonyme",
      message: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const usernameValue = username.trim() || "Anonyme";
    const msg = messageInput.trim();

    if (!msg) return;

    const currentHour = new Date().getHours();

    // Règle 1 : Heure interdite
    if (currentHour >= 2 && currentHour < 5) {
      if (!deductPenalty(penalites.heureInterdite)) {
        updateNotification("Heure interdite ❌");
        return;
      }
    }

    // Règle 2 : Spam
    if (msg === lastMessage) {
      if (!deductPenalty(penalites.spam)) {
        updateNotification("Spam détecté ❌");
        return;
      }
    }

    // Règle 3 : Mots interdits
    if (forbiddenWords.some((word) => msg.toLowerCase().includes(word))) {
      if (!deductPenalty(penalites.mauvaisMot)) {
        updateNotification("Mot interdit ❌");
        return;
      }
    }

    // Règle 5 : Limite de messages par heure
    if (messageCount >= messageLimit) {
      if (!deductPenalty(penalites.depassement)) {
        updateNotification("Trop de messages envoyés ❌");
        return;
      }
    }

    // Règle 4 : Solde insuffisant
    if (userBalance < 0) {
      updateNotification("Solde insuffisant, message bloqué ❌");
      return;
    }

    // Affichage du message
    displayMessage(usernameValue, msg);
    setLastMessage(msg);
    setMessageInput("");
    setMessageCount((prev) => prev + 1);
    setNotification("");
  };

  // Réinitialiser le compteur de messages toutes les heures
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount(0);
    }, 3600000); // 1 heure

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    const messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>ln-bootcamp Group</title>
        <meta
          name="description"
          content="Bitcoin Chat Messenger with penalty system"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="border-black flex items- justify-center space-x-8 min-h-screen bg-yellow-100 py-10 px-5 text-black">
        <div className="bg-white h-max rounded-lg">
          {/* Champ pseudo */}
          <div className="p-3">
            <input
              type="text"
              className="w-3/5 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ton pseudo..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Solde affiché */}
          <div className="mx-3 mb-2">
            <div className="inline-block bg-green-200 text-teal-700 font-bold px-3 py-2 rounded-2xl text-sm">
              Solde : {userBalance} sats
            </div>
          </div>
        </div>

        <div className="">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <h2 className="text-center bg-teal-700 text-white py-3 text-lg font-semibold">
              ln-bootcamp Group
            </h2>

            {/* Section Règles */}
            <div className="bg-gray-100 border-b border-gray-300 p-3 text-black">
              <h3 className="font-semibold mb-2 text-sm">Règles du chat</h3>
              <ul className="text-xs space-y-1 ml-4 list-disc">
                <li>
                  Messages interdits entre 2h et 5h du matin → pénalité
                  automatique.
                </li>
                <li>Spam (même message plusieurs fois) → pénalité.</li>
                <li>Mots interdits (violence, injures) → pénalité.</li>
                <li>
                  Solde insuffisant → message bloqué, notification affichée.
                </li>
                <li>
                  Limite de messages par heure (10 max) → au-delà = pénalité.
                </li>
              </ul>
            </div>
            {/* Zone messages façon WhatsApp */}
            <div
              id="messages"
              className="bg-yellow-50 min-h-64 max-h-80 overflow-y-auto p-3 mx-2 rounded-lg mb-2 flex flex-col gap-2"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="max-w-xs ml-auto bg-green-200 px-3 py-2 rounded-2xl text-right text-sm shadow-sm break-words"
                >
                  <span className="block text-xs text-gray-600 font-bold mb-1">
                    {msg.username}
                  </span>
                  {msg.message}
                </div>
              ))}
            </div>
            {/* Input row */}
            <form
              className="flex gap-2 p-3 bg-gray-100 border-t border-gray-200"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Écris ton message..."
                autoComplete="off"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors duration-200 text-sm"
              >
                Envoyer
              </button>
            </form>

            {/* Notification */}
            {notification && (
              <p className="text-red-600 text-sm min-h-5 px-3 pb-2">
                {notification}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
