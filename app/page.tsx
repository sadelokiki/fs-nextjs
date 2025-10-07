"use client";

import type React from 'react';
import { fetchPosts } from '../prisma/helpers/post';
import type { PostWithAuthor } from '../types';
import { useState, useEffect } from "react";
import Link from "next/link"

export default function Journal() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      if(!res.ok) throw new Error("Failed to fetch posts")
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError("Could not load posts. Please refresh.");
    }
  }

  useEffect(() => { 
    fetchPosts(); 
  }, []);

  // Keyboard shortcut: focus textarea when pressing "/" or "n"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement?.tagName?.toLowerCase();
      // Only trigger if user isn’t already typing in an input or textarea
      if ((e.key === "/" || e.key === "n") && active !== "textarea" && active !== "input") {
        e.preventDefault();
        document.getElementById("postContent")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  // Handle new post creation
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return setError("Message cannot be empty");
    setError(null);
    setLoading(true);

    // Optimistic UI update
    const optimisticPost: PostWithAuthor = { 
      id: crypto.randomUUID(), //temporary id for UI
      content, 
      title: "",
      authorId: crypto.randomUUID(),
      createdAt: new Date(),
      author: { id: crypto.randomUUID(), name: "You", email: null, createdAt: new Date() },
    };
    setPosts([optimisticPost, ...posts]);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({content})
      });

      if(!res.ok) throw new Error("failed to post message")

      const newPost = await res.json()
      //replace optimistic post with real post
      setPosts((prev) => 
        [newPost, ...prev.filter((p) => p.id !== optimisticPost.id)]
      )
      setContent("")
    } catch(err) {
      setError("Something went wrong while posting")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 fw-bold">Journal</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        aria-label="Write a new journal entry"
        className="card p-3 mb-4 shadow-sm"
      >
        <label htmlFor="postContent" className="form-label visually-hidden">
          Write your journal entry
        </label>

        <textarea
          id="postContent"
          className="form-control mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          aria-label="Write a journal entry"
          rows={3}
        />

        {error && (
          <p className="text-danger fw-semibold" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-2"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <h2 className="mb-3 fw-semibold">All Entries</h2>

      {/* Posts List */}
      <ul className="list-unstyled">
        {posts.map((post) => (
          <li key={post.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p className="card-text mb-3">{post.content}</p>
              <div className="d-flex justify-content-between text-muted small">
                <Link
                  href={`/users/${post.author?.id ?? ""}`}
                  className="text-decoration-none fw-semibold text-primary"
                >
                  {post.author?.name || "Guest"}
                </Link>
                <time dateTime={post.createdAt.toString()}>
                  {new Date(post.createdAt).toLocaleString()}
                </time>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
