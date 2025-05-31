import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

const POSTS_PER_PAGE = 10;

export default function HomePage({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <>
      <Head>
        <title>Danh sách blog</title>
        <meta name="description" content="Danh sách Blog" />
      </Head>
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Danh sách blog</h1>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id} className="mb-4 capitalize  border-b pb-2">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
              <p className="text-gray-700">{post.body.substring(0, 200)}...</p>
            </li>
          ))}
        </ul>
        <nav className="flex justify-center space-x-3 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </nav>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=100"
  );
  const posts: Post[] = await res.json();

  return {
    props: { posts },
  };
}
