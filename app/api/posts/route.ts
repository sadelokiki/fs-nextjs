import { NextResponse } from 'next/server';
import { fetchPosts, createPost } from '../../../prisma/helpers/post';
import { getOrCreateGuestUser } from "../../../lib/auth"

export async function GET(): Promise<NextResponse> {
  const posts = await fetchPosts();
  return NextResponse.json(posts);
}

export async function POST(req: any) {
  try {
    const { content, title } = await req.json()
    const user = await getOrCreateGuestUser()

    const post = await createPost({
      authorId: user.id,
      content,
      title,
    })
    return NextResponse.json(post, {status: 201 })
  } catch (error: any) {
    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create post"},
      { status: 400 }
    )
  }
}