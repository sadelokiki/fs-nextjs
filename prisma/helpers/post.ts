import prisma from '../../lib/prisma';
import type { PostWithAuthor } from '../../types';

export function fetchPosts(): Promise<PostWithAuthor[]> {
  return prisma.post.findMany({ include: { author: true } });
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


