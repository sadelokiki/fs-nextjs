import prisma from '../../lib/prisma';

export const fetchPosts = () => {
  return prisma.post.findMany({
    include: { author: true },
  });
};

export const findPost = (id) => {
  return prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};
