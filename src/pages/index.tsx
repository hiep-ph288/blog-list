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
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-[24px] text-center">Danh sách blog</h1>
        <div className="flex flex-col gap-[8px] w-[80%] mx-auto">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="list-none px-[8px] py-[2px] border rounded-[8px]"
            >
              <Link
                href={`/post/${post.id}`}
                className="text-[20px] no-underline"
              >
                {post.title}
              </Link>
              <p className="text-[14px] no-underline">
                {post.body.substring(0, 200)}...
              </p>
            </div>
          ))}
        </div>
        <nav className="flex justify-center mt-[16px]">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-[12px] py-[4px] border rounded disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-[12px] py-[4px] border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-[12px] py-[4px] border rounded disabled:opacity-50"
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
