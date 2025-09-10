// src/features/newsletter/service.js
import { supabase } from "@/utils/supabase/client"

// Subscribe user (add email to newsletter_subscribers table)
export async function subscribeNewsletter(email) {
  if (!email) throw new Error("Email is required")

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Unsubscribe user (remove email)
export async function unsubscribeNewsletter(email) {
  if (!email) throw new Error("Email is required")

  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("email", email)

  if (error) throw new Error(error.message)
  return true
}

// Get all subscribers (for Admin dashboard)
export async function getSubscribers() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
