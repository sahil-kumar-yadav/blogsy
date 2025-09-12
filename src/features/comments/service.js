import supabase from "@/core/supabase/client"

// Get all comments for a post
export async function getComments(postId) {
  const parsedId = Number(postId)

  if (!parsedId || isNaN(parsedId)) {
    console.error("❌ Invalid postId passed to getComments:", postId)
    return []
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, post_id, author, content, created_at, updated_at")
    .eq("post_id", parsedId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("❌ Error fetching comments:", error.message)
    return []
  }

  return data || []
}

// Get single comment
export async function getComment(id) {
  const parsedId = Number(id)

  if (!parsedId || isNaN(parsedId)) {
    console.error("❌ Invalid id passed to getComment:", id)
    return null
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", parsedId)
    .single()

  if (error) {
    console.error("❌ Error fetching comment:", error.message)
    return null
  }

  return data
}

// Create comment
export async function createComment({ postId, author, content }) {
  const parsedPostId = Number(postId)

  if (!parsedPostId || isNaN(parsedPostId)) {
    console.error("❌ Invalid postId passed to createComment:", postId)
    return null
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: parsedPostId,
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
  const parsedId = Number(id)

  if (!parsedId || isNaN(parsedId)) {
    console.error("❌ Invalid id passed to updateComment:", id)
    return null
  }

  const { data, error } = await supabase
    .from("comments")
    .update({ content, updated_at: new Date() })
    .eq("id", parsedId)
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
  const parsedId = Number(id)

  if (!parsedId || isNaN(parsedId)) {
    console.error("❌ Invalid id passed to deleteComment:", id)
    return false
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", parsedId)

  if (error) {
    console.error("❌ Error deleting comment:", error.message)
    return false
  }

  return true
}
