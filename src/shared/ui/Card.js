export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 shadow-sm p-4 bg-white ${className}`}
    >
      {children}
    </div>
  )
}
