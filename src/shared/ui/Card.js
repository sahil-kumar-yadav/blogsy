export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  as: Component = "div",
  ...props
}) {
  const base =
    "rounded-xl border transition-all duration-200 bg-[var(--color-bg)] text-[var(--color-fg)]";

  const variants = {
    default:
      "border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
    outlined:
      "border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:shadow-sm",
    hover:
      "border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer",
    glass:
      "bg-white/70 dark:bg-gray-800/60 border border-white/20 shadow-lg backdrop-blur-md",
  };

  const paddings = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <Component
      className={`${base} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
