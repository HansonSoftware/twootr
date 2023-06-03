import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { Header } from "~/components/Header";
import { LoadingPage } from "~/components/LoadingSpinner";
import { PostView } from "~/components/PostView";
import { generateSSGHelper } from "~/server/helpers/SSGHelper";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data || data.length === 0) {
    return <div>User has not posted!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) {
    return <div>404</div>;
  }

  return (
    <>
      <Head>
        <title>{`@${data.username}`}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-20"></div>
      <div className="relative h-28 w-full border-t-2 border-info">
        <img
          src={data.profileImageUrl}
          alt="Profile Picture"
          className="absolute bottom-0 left-0 -mb-[48px] ml-4 w-28 rounded-full border-4 border-neutral-content"
        />
      </div>
      {/* invisible padding */}
      <div className="h-[48px]"></div>
      <div className="border-b-2 border-info p-4 text-xl font-bold">{`@${data.username}'s Profile`}</div>
      <ProfileFeed userId={data.id} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    throw new Error("No slug");
    // TODO: re-route to "/" on error
  }

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username: username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
