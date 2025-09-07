import MiniSearch from "minisearch"

let miniSearch

export function initSearch(posts, projects) {
    miniSearch = new MiniSearch({
        fields: ["title", "content"], // fields to index
        storeFields: ["id", "title", "slug", "type"], // fields to return
        searchOptions: {
            prefix: true,
            fuzzy: 0.2, // allow minor typos
        },
    })

    const docs = [
        ...posts.map((p) => ({
            id: `post-${p.id}`,
            title: p.title,
            content: p.content,
            slug: p.slug,
            type: "post",
        })),
        ...projects.map((pr) => ({
            id: `project-${pr.id}`,
            title: pr.title,
            content: pr.description,
            slug: pr.slug,
            type: "project",
        })),
    ]

    miniSearch.addAll(docs)
}

export function search(query) {
    if (!miniSearch) return []
    return miniSearch.search(query)
}
