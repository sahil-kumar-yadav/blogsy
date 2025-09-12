// src/app/api/admin/billing/subscriptions/route.js
import { NextResponse } from "next/server"
import supabaseServer from "@/core/supabase/server"

// GET /api/admin/billing/subscriptions
// → List all subscriptions (with customer info)
export async function GET() {
  const supabase = supabaseServer()

  // Fetch subscriptions and join customer info
  const { data, error } = await supabase
    .from("subscriptions")
    .select(`
      *,
      customer:customers(*)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/admin/billing/subscriptions
// → Create a new subscription manually (edge case)
export async function POST(req) {
  const supabase = supabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("subscriptions")
    .insert([body])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}
