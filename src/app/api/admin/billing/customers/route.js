import { NextResponse } from "next/server";
import { createServerClient } from "@/core/supabase/server"; // secure server client

// GET all Stripe customers stored in Supabase
export async function GET() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("customers") // <-- your Supabase table
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST a new customer (admin use only)
export async function POST(req) {
  const supabase = createServerClient();
  const body = await req.json();

  const { email, stripe_id } = body;

  if (!email || !stripe_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("customers")
    .insert([{ email, stripe_id }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
