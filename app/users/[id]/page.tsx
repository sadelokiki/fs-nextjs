import { prisma } from "../../../lib/prisma";

interface UserPageProps {
    params: {
      id: string; // always a string in Next.js, even if your DB uses Int
    };
  }

export default async function UserProfile({ params }: UserPageProps) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id }, // or just params.id if UUID
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return <p className="text-center text-gray-500 mt-10">User not found</p>;
  }

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h1 className="fs-3 fw-semibold mb-4">
        {user.name || "Guest User"}
      </h1>

      {user.posts.length === 0 ? (
        <p className="text-muted">No entries yet.</p>
      ) : (
        user.posts.map((post) => (
          <div key={post.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p className="card-text mb-2">{post.content}</p>
              <p className="text-secondary small mb-0">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
