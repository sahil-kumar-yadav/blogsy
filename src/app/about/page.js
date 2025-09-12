// app/about/page.jsx

export const metadata = {
  title: "About – Blogsy",
  description: "Learn more about Blogsy and our mission to empower writers.",
}

export default function AboutPage() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-4">
          About Blogsy
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
          Blogsy is a modern blog platform built for thinkers, storytellers, and curious minds. We're creating a space where great ideas meet beautiful design.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <img
          src="/leafs.jpg"
          alt="Writing illustration"
          className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-4">Our Mission</h2>
          <p className="text-[var(--color-fg)] mb-4 leading-relaxed">
            At Blogsy, we believe everyone has a story worth sharing. Our mission is to empower individuals to express themselves freely, creatively, and authentically — without distractions or limits.
          </p>
          <p className="text-[var(--color-muted)]">
            Whether you're writing personal reflections, sharing your expertise, or exploring new ideas, Blogsy gives you the tools to do it in style.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-10 shadow-xl">
        <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6 text-center">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
              Freedom of Expression
            </h3>
            <p className="text-[var(--color-muted)] text-sm">
              No algorithms. No noise. Just your voice — unfiltered and authentic.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
              Clean Design
            </h3>
            <p className="text-[var(--color-muted)] text-sm">
              We obsess over typography, spacing, and simplicity so your content shines.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
              Community First
            </h3>
            <p className="text-[var(--color-muted)] text-sm">
              Connect with curious readers and creators who value quality over quantity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
