import type React from 'react';
import { fetchPosts } from '../prisma/helpers/post';
import type { PostWithAuthor } from '../types';

export default async function Journal(): Promise<React.ReactElement> {
  const posts: PostWithAuthor[] = await fetchPosts();
  return (
    <>
      <h1>Posts</h1>
      {/* todo: render posts in a user-friendly way*/}
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
