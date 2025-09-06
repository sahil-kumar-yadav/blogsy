export default function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-900 ${className}`}
        >
            {children}
        </div>
    )
}
