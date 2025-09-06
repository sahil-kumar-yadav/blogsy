let posts = [
    {
        id: 1,
        title: "Hello World",
        slug: "hello-world",
        date: "2025-09-01",
        description: "First post demo",
        body: "This is a test post.",
    },
]

export function getPosts() {
    return posts
}

export function getPost(id) {
    return posts.find((p) => p.id === Number(id))
}

export function createPost(post) {
    const newPost = { id: Date.now(), ...post }
    posts.push(newPost)
    return newPost
}

export function updatePost(id, updated) {
    posts = posts.map((p) => (p.id === Number(id) ? { ...p, ...updated } : p))
    return getPost(id)
}

export function deletePost(id) {
    posts = posts.filter((p) => p.id !== Number(id))
}
