"use client"
import { useState } from "react"
import CommentBox from "./CommentBox"
import CommentList from "./CommentList"

export default function CommentsSection({ postId }) {
  const [newComment, setNewComment] = useState(null)

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>
      <CommentBox postId={postId} onCommentAdded={setNewComment} />
      <CommentList postId={postId} newComment={newComment} />
    </section>
  )
}
