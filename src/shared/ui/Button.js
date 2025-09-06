export default function Button({ children, variant = "primary", ...props }) {
    const base =
        "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none"

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        outline:
            "border border-gray-400 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800",
    }

    return (
        <button className={`${base} ${variants[variant]}`} {...props}>
            {children}
        </button>
    )
}
