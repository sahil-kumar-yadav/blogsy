import Heading from "@/components/shared/Heading";
import NewsletterForm from "@/features/newsletter/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-8 py-20 shadow-xl border border-white/10">
      {/* Decorative glow */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <Heading level={2} className="text-4xl font-extrabold tracking-tight text-indigo-300 drop-shadow-md">
          Subscribe to the Newsletter
        </Heading>
        <p className="text-base text-indigo-200 max-w-md mx-auto">
          Stay up to date with the latest posts and projects. No spam, just clean code and good vibes.
        </p>

        {/* Form */}
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
