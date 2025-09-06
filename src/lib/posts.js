import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');


export async function getSortedPostsData() {
    const names = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
        names
            .filter(n => /\.mdx?$/.test(n))
            .map(async filename => {
                const slug = filename.replace(/\.mdx?$/, '');
                const fullPath = path.join(postsDirectory, filename);
                const fileContents = await fs.readFile(fullPath, 'utf8');
                const { data } = matter(fileContents);
                return { slug, ...(data || {}) };
            })
    );
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}


export async function getPostBySlug(slug) {
    const mdPathCandidates = [
        path.join(postsDirectory, `${slug}.md`),
        path.join(postsDirectory, `${slug}.mdx`)
    ];


    let fileContents = null;
    for (const p of mdPathCandidates) {
        try { fileContents = await fs.readFile(p, 'utf8'); break; } catch (e) { }
    }
    if (!fileContents) throw new Error(`Post not found: ${slug}`);


    const { data, content } = matter(fileContents);
    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();
    return { slug, contentHtml, ...(data || {}) };
}