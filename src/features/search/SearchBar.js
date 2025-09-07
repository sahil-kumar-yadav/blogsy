"use client"
import { useState } from "react"
import Link from "next/link"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (res.ok) {
      setResults(await res.json())
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((r) => (
            <li key={r.id} className="p-3 border border-gray-200 rounded-md bg-white">
              <Link
                href={`/blog/${r.slug}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {r.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">Blog Post</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
