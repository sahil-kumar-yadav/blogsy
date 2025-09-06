"use client"
import { useState } from "react"
import CommentBox from "./CommentBox"
import CommentList from "./CommentList"

export default function CommentsSection() {
    const [newComment, setNewComment] = useState(null)

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">Comments</h2>
            <CommentBox onCommentAdded={setNewComment} />
            <CommentList newComment={newComment} />
        </section>
    )
}
