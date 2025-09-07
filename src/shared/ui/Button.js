export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  asChild, // <- destructured here
  ...props
}) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[var(--color-accent)] text-white hover:bg-blue-700 focus:ring-blue-400 shadow-sm hover:shadow-md",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800",
    ghost: "text-[var(--color-fg)] hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
