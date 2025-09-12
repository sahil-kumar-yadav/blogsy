// src/features/newsletter/service.js
import supabase from "@/core/supabase/client"

// Add subscriber (public)
export async function addSubscriber(email) {
  const { data, error } = await supabase
    .from("newsletter")
    .insert([{ email }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
