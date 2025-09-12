import Heading from "@/components/shared/Heading"
import Card from "@/components/shared/Card"
import CommentsSection from "@/features/comments/CommentsSection"

export default function CommentsTeaser({ postId }) {
    return (
        <section>
            <Card>
                <Heading level={2} className="mb-4">
                    Community Buzz
                </Heading>
                <CommentsSection postId={postId} />
            </Card>
        </section>
    )
}
