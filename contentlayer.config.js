import { defineDocumentType, makeSource } from "contentlayer/source-files"

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `posts/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true },
        description: { type: "string", required: true },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (post) =>
                post._raw.sourceFileName.replace(/\\.mdx$/, ""),
        },
    },
}))

export default makeSource({
    contentDirPath: "src/content",
    documentTypes: [Post],
})
