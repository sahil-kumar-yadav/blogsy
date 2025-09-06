export async function POST(req) {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        })
    }

    // TODO: integrate with Resend/Mailchimp/Supabase
    console.log("New subscriber:", email)

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    })
}
