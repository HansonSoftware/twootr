import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";

import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  /* getAll is a public procedure to get all posts in the db.
     Located in ~server/api/routers/posts.ts */
  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Twootr</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        data-theme="lofi"
        className="grid place-content-center place-items-center bg-base-100"
      >
        <div className="min-h-screen max-w-4xl md:border-l-2 md:border-r-2 md:border-info">
          <Navbar />
          <div className="pt-8">
            {data?.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
