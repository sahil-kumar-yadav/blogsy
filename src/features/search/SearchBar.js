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
                    placeholder="Search posts or projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-2 border rounded-md dark:bg-gray-800"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Search
                </button>
            </form>

            {results.length > 0 && (
                <ul className="space-y-2">
                    {results.map((r) => (
                        <li
                            key={r.id}
                            className="p-2 border rounded-md dark:border-gray-700"
                        >
                            <Link
                                href={`/${r.type === "post" ? "blog" : "about/projects"}/${r.slug}`}
                                className="font-semibold hover:underline"
                            >
                                {r.title}
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {r.type}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
