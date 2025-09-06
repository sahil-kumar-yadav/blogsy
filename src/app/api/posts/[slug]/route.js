import { allPosts } from "contentlayer/generated"

export async function GET(req, { params }) {
    const post = allPosts.find((p) => p.slug === params.slug)

    if (!post) {
        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        })
    }

    return new Response(JSON.stringify(post), {
        headers: { "Content-Type": "application/json" },
    })
}
