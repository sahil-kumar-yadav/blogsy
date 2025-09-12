import supabase from "@/core/supabase/client"

// Get all posts
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, updated_at, premium") // removed 'image'
    .order("created_at", { ascending: false })

  if (error) {
    console.error("❌ Error fetching posts:", error.message)
    return []
  }
  return data || []
}

// Get single post by ID
export async function getPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("❌ Error fetching post:", error.message)
    return null
  }
  return data
}

// Get single post by slug
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("❌ Error fetching post by slug:", error.message)
    return null
  }
  return data
}

// Create a new post
export async function createPost({ title, slug, content, premium = false }) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, slug, content, premium }]) // removed 'image'
    .select()
    .single()

  if (error) {
    console.error("❌ Error creating post:", error.message)
    return null
  }
  return data
}

// Update existing post
export async function updatePost(id, { title, slug, content, premium }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, slug, content, premium, updated_at: new Date() }) // removed 'image'
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("❌ Error updating post:", error.message)
    return null
  }
  return data
}

// Delete a post
export async function deletePost(id) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("❌ Error deleting post:", error.message)
    return false
  }
  return true
}
