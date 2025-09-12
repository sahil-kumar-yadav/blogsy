"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("✅ Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center justify-center"
    >
      {/* Email Input */}
      <input
        type="email"
        required
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
      />

      {/* Subscribe Button */}
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 active:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 shadow-lg"
      >
        Subscribe
      </button>

      {/* Status Message */}
      {status && (
        <p
          className={`w-full text-center text-sm mt-3 sm:mt-0 sm:ml-4 transition-opacity duration-300 ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
