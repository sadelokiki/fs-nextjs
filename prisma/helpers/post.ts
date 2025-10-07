import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import type { PostWithAuthor } from '../../types';

export function fetchPosts(): Promise<PostWithAuthor[]> {
  return prisma.post.findMany({ 
    include: { author: true }, 
    orderBy: { createdAt: "desc"},
  });
}

export function findPost(id: number | string): Promise<PostWithAuthor | null> {
  const numericId = typeof id === 'string' ? Number(id) : id;
  if (!Number.isFinite(numericId)) {
    throw new TypeError('Invalid post id');
  }
  return prisma.post.findUnique({
    where: { id: Number(numericId) },
    include: { author: true },
  });
}

export async function createPost({authorId, content, title=""}) {
  if(!content || !content.trim()) {
    throw new Error("Content is required")
  }

  const post = await prisma.post.create({
    data: {
      content,
      title,
      author: { connect: {id: authorId}},
    },
    include: {author: true},
  })
  return post
  
}

