import supabase from "@/core/supabase/client"

// Get all projects
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

// Get single project by ID
export async function getProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Create a project
export async function createProject({ name, slug, description, link }) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ name, slug, description, link }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Update a project
export async function updateProject(id, { name, slug, description, link }) {
  const { data, error } = await supabase
    .from("projects")
    .update({ name, slug, description, link, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Delete a project
export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  return true
}
