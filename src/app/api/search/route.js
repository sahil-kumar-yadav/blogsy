import { NextResponse } from "next/server"
import { getPosts } from "@/features/posts/service"
import { getProjects } from "@/features/projects/service"
import { initSearch, search } from "@/features/search/searchIndex"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const q = searchParams.get("q")

        if (!q) {
            return NextResponse.json([])
        }

        // Load content from DB
        const posts = await getPosts()
        const projects = await getProjects()

        // Init search index
        initSearch(posts, projects)

        const results = search(q)
        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
