import { type NextPage } from "next";
import Head from "next/head";
import { Navbar } from "~/components/Header";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Post View</div>
    </>
  );
};

export default SinglePostPage;
