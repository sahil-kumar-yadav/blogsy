import supabase from "@/core/supabase/client"

// Get all comments for a post
export async function getComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("id, post_id, author, content, created_at, updated_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("❌ Error fetching comments:", error.message)
    return []
  }
  return data || []
}

// Get single comment
export async function getComment(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("❌ Error fetching comment:", error.message)
    return null
  }
  return data
}

// Create comment
export async function createComment({ postId, author, content }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        author,
        content,
        created_at: new Date(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("❌ Error creating comment:", error.message)
    return null
  }
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

  if (error) {
    console.error("❌ Error updating comment:", error.message)
    return null
  }
  return data
}

// Delete comment
export async function deleteComment(id) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("❌ Error deleting comment:", error.message)
    return false
  }
  return true
}
