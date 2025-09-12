import Heading from "@/components/shared/Heading";

export default function CancelPage() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-20">
      {/* Decorative glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>

      {/* Content Card */}
      <div className="relative z-10 max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-12 text-center shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-6">
        <Heading level={1} className="text-3xl font-bold text-red-400">
          ❌ Subscription Cancelled
        </Heading>
        <p className="text-base text-gray-300">
          Your subscription process was cancelled. You can try again anytime — we’ll be here.
        </p>
        <a
          href="/subscribe"
          className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Try Again
        </a>
      </div>
    </section>
  );
}
