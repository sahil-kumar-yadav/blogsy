import MiniSearch from "minisearch"
import { allPosts } from "contentlayer/generated"

let miniSearch

export function getSearchIndex() {
    if (!miniSearch) {
        miniSearch = new MiniSearch({
            fields: ["title", "description", "body"], // searchable
            storeFields: ["title", "description", "slug", "date"], // retrievable
        })

        miniSearch.addAll(
            allPosts.map((post) => ({
                id: post._id,
                title: post.title,
                description: post.description,
                slug: post.slug,
                date: post.date,
                body: post.body.raw,
            }))
        )
    }

    return miniSearch
}
