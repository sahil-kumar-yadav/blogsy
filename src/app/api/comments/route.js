let comments = [] // In-memory (reset on restart)

export async function GET() {
    return new Response(JSON.stringify(comments), {
        headers: { "Content-Type": "application/json" },
    })
}

export async function POST(req) {
    const { name, text } = await req.json()

    if (!name || !text) {
        return new Response(JSON.stringify({ error: "Missing fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        })
    }

    const newComment = { id: Date.now(), name, text }
    comments.push(newComment)

    return new Response(JSON.stringify(newComment), {
        headers: { "Content-Type": "application/json" },
    })
}
