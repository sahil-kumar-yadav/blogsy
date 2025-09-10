import supabase from "@/core/supabase/client"

// Get all posts
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// Get single post by ID
export async function getPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Get single post by slug
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Create a new post
export async function createPost({ title, slug, content }) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, slug, content }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Update existing post
export async function updatePost(id, { title, slug, content }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, slug, content, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Delete a post
export async function deletePost(id) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  return true
}
