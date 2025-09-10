import supabase from "@/core/supabase/client"

// Get all comments for a post
export async function getComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// Get single comment
export async function getComment(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Create comment
export async function createComment({ postId, author, content }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, author, content }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Update comment
export async function updateComment(id, { content }) {
  const { data, error } = await supabase
    .from("comments")
    .update({ content, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Delete comment
export async function deleteComment(id) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  return true
}
