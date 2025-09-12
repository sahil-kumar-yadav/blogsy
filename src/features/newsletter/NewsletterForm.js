"use client";
import { useState } from "react";
import { addSubscriber } from "@/features/newsletter/service";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    try {
      await addSubscriber(email);
      setStatus("success");
      setMessage("You're officially on the list 🎉");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col sm:flex-row gap-4 items-center justify-center"
    >
      {/* Email Input */}
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
      />

      {/* Subscribe Button */}
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] focus:ring-2 focus:ring-indigo-400 transition-all duration-200 shadow-lg"
      >
        Subscribe
      </button>

      {/* Feedback UI */}
      {status === "success" && (
        <div className="absolute top-full mt-6 w-full max-w-md mx-auto bg-green-600/10 border border-green-400 text-green-300 rounded-xl px-4 py-3 text-center shadow-md animate-fade-in">
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute top-full mt-6 w-full max-w-md mx-auto bg-red-600/10 border border-red-400 text-red-300 rounded-xl px-4 py-3 text-center shadow-md animate-fade-in">
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </form>
  );
}
