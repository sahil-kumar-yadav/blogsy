export default function Heading({
  level = 1,
  children,
  className = "",
  variant = "default",
  align = "left",
  animated = false,
}) {
  const Tag = `h${level}`;

  const sizes = {
    1: "text-4xl md:text-5xl font-bold tracking-tight",
    2: "text-3xl md:text-4xl font-semibold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium uppercase tracking-wide",
  };

  const variants = {
    default: "text-[var(--color-fg)]",
    accent: "text-[var(--color-accent)]",
    muted: "text-[var(--color-muted)]",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`${sizes[level]} ${variants[variant]} ${aligns[align]} ${
        animated ? "fade-in-up" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
