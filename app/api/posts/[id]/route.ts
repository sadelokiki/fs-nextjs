import { NextResponse } from 'next/server';
import { findPost } from '../../../../prisma/helpers/post';

export async function GET(_req: Request, context: { params: { id: string } }): Promise<NextResponse> {
  const post = await findPost(context.params.id);
  return NextResponse.json(post);
}
