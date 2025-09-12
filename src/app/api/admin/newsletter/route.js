// src/app/api/admin/newsletter/route.js
import supabaseAdmin from "@/core/supabase/server"

// GET all subscribers
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("newsletter")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return new Response(error.message, { status: 500 })
  return Response.json(data)
}

// POST add subscriber (admin-triggered, optional)
export async function POST(req) {
  const { email } = await req.json()
  const { data, error } = await supabaseAdmin
    .from("newsletter")
    .insert([{ email }])
    .select()
    .single()

  if (error) return new Response(error.message, { status: 500 })
  return Response.json(data)
}
