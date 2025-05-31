import Head from "next/head";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function DetailBlogPage({ post }: { post: Post }) {
  if (!post) return <p>Bài viết không tồn tại</p>;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body.substring(0, 150)} />
      </Head>
      <main className="max-w-3xl mx-auto p-[24px]">
        <h1 className="text-[32px] font-bold text-center">{post.title}</h1>
        <p className="text-[16px] leading-relaxed">{post.body}</p>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  );
  if (res.status !== 200) {
    return { notFound: true };
  }
  const post: Post = await res.json();

  return {
    props: { post },
  };
}
