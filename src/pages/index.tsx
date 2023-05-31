import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignIn, UserButton } from "@clerk/nextjs";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Twootr</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <header>
          <UserButton afterSignOutUrl="/" />
        </header>
        <div>
          <SignIn />
        </div>
      </main>
    </>
  );
};

export default Home;
