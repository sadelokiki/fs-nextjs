import { NextResponse } from 'next/server';
import { fetchPosts } from '../../../prisma/helpers/post';

export async function GET(): Promise<NextResponse> {
  const posts = await fetchPosts();
  return NextResponse.json(posts);
}


