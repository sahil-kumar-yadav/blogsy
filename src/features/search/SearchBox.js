"use client"
import { useState } from "react"
import { getSearchIndex } from "./indexContent"
import Link from "next/link"
import Card from "../../shared/ui/Card"

export default function SearchBox() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const handleChange = (e) => {
        const q = e.target.value
        setQuery(q)

        if (q.length > 1) {
            const miniSearch = getSearchIndex()
            const res = miniSearch.search(q, { prefix: true, fuzzy: 0.2 })
            setResults(res)
        } else {
            setResults([])
        }
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800"
            />

            {results.length > 0 && (
                <div className="space-y-2">
                    {results.map((r) => (
                        <Card key={r.id}>
                            <Link href={`/blog/${r.slug}`}>
                                <h3 className="text-lg font-semibold hover:underline">
                                    {r.title}
                                </h3>
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {r.description}
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
