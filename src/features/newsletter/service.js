import supabase from "@/core/supabase/client"

// Get all subscribers
export async function getSubscribers() {
  const { data, error } = await supabase
    .from("newsletter")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// Add subscriber
export async function addSubscriber(email) {
  const { data, error } = await supabase
    .from("newsletter")
    .insert([{ email }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Delete subscriber
export async function deleteSubscriber(id) {
  const { error } = await supabase
    .from("newsletter")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  return true
}
