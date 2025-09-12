"use client";
import { useState } from "react";
import { addSubscriber } from "@/features/newsletter/service";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubscriber(email);
      setStatus("🎉 Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus(err.message || "Something went wrong.");
    }
  };

  return (
    <section className="relative max-w-xl mx-auto px-6 py-16 space-y-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] text-white">
      {/* Decorative glow */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-400/30 rounded-full blur-2xl"></div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-300 drop-shadow-md">
        Join Our Newsletter
      </h1>
      <p className="text-center text-gray-300 text-base max-w-md mx-auto">
        Get updates on new projects, articles, and exclusive content. No spam, ever.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Subscribe
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <p className="text-center text-sm text-green-400 transition-opacity duration-300">
          {status}
        </p>
      )}
    </section>
  );
}
