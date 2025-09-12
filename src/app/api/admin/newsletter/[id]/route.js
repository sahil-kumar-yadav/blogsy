// src/app/api/admin/newsletter/[id]/route.js
import supabaseAdmin from "@/core/supabase/server"

// DELETE subscriber
export async function DELETE(_, { params }) {
  const { id } = params
  const { error } = await supabaseAdmin
    .from("newsletter")
    .delete()
    .eq("id", id)

  if (error) return new Response(error.message, { status: 500 })
  return Response.json({ success: true })
}
