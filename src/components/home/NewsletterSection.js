import Heading from "@/shared/ui/Heading";
import NewsletterForm from "@/features/newsletter/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] via-[#312e81] to-[#1e40af] text-white p-10 shadow-xl backdrop-blur-md border border-white/10">
      <div className="relative z-10 space-y-6 text-center">
        <Heading level={2} className="text-white text-3xl font-semibold tracking-tight">
          Subscribe to the Newsletter
        </Heading>
        <p className="text-indigo-200 text-base max-w-md mx-auto">
          Stay up to date with the latest posts and projects. No spam, ever.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
