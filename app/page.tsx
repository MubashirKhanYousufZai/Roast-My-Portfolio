"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function RoastPage() {
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoast = async () => {
    if (!portfolioUrl.trim()) {
      setError("❌ Portfolio URL is required! URL tw de.. Dar kyu rha hai Phato 🤣");
      return;
    }
    setError("");
    setLoading(true);
    setRoast("");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to get roast 😢 Agli dafa bach kr dikha mujhse 😤");
      } else {
        setRoast(data.roast);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center px-4 py-8 text-white relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10"
      >
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🔥 Roast My Portfolio
        </h1>
        <p className="text-center text-gray-400 mb-8 text-base md:text-lg">
          Drop your portfolio link and let our AI roast it — professionally, sarcastically, and with style 😎
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="https://yourportfolio.vercel.app"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm md:text-base"
          />
          <button
            onClick={handleRoast}
            disabled={loading}
            className="px-6 py-3.5 bg-linear-to-r from-pink-600 to-purple-600 hover:opacity-90 rounded-xl font-semibold transition-all text-sm md:text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Roasting...
              </>
            ) : (
              "🔥 Roast 🔥"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-red-400 mt-4 text-sm md:text-base text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Roast Result */}
        {roast && (
          <motion.div
            className="mt-8 bg-gray-800/70 p-5 md:p-6 rounded-xl border border-gray-700 text-gray-200 max-h-[400px] overflow-y-auto shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg md:text-xl font-bold text-pink-400 mb-3">
              🧠 Honest Roast:
            </h2>
            <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
              {roast}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
