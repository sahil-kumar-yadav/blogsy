export default function ButtonComponent({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  asChild = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--color-accent)] dark:text-white hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-active)] focus-visible:ring-[var(--color-accent-ring)] shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-400 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:active:bg-gray-700",
    ghost:
      "text-[var(--color-fg)] hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const composedClass = [
    base,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? "w-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const Comp = asChild ? "span" : "button"; // fallback to span if asChild is true

  return (
    <Comp className={composedClass} {...props}>
      {children}
    </Comp>
  );
}
