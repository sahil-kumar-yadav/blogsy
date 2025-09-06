import { getSortedPostsData } from '../../../../lib/posts';


export async function GET() {
    const posts = await getSortedPostsData();
    return new Response(JSON.stringify(posts), { headers: { 'Content-Type': 'application/json' } });
}