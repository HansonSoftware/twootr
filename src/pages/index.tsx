import { type NextPage } from "next";
import Head from "next/head";
import { RouterOutputs, api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage, LoadingSpinner } from "~/components/LoadingSpinner";
dayjs.extend(relativeTime);

const Home: NextPage = () => {
  const { isLoaded: userLoaded } = useUser();

  /* Start fetching ASAP (Cached for Feed.) */
  api.posts.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>Twootr</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-theme="lofi" className="grid place-items-center bg-base-100">
        <div className="min-h-screen md:border-x-2 md:border-slate-400">
          <Navbar />
          <CreatePost />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;

const CreatePost = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <img src={user.profileImageUrl} className="h-14 w-14 rounded-full" />
      <input
        type="text"
        placeholder="Type something awesome..."
        className="input w-full cursor-text outline-none focus:outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <article id={post.id} className="w-full p-2">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={author?.profileImageUrl}
              alt={`@${author.username}'s profile picture`}
            />
          </div>
        </div>
        <div className="chat-bubble chat-bubble-info">{post.content}</div>
        <div className="chat-footer">
          {`@${author?.username} · `}
          <time className="text-xs opacity-50">
            {dayjs(post.createdAt).fromNow()}
          </time>
        </div>
      </div>
    </article>
  );
};

const Feed = () => {
  /* getAll is a public procedure to get all posts in the db.
     Located in ~server/api/routers/posts.ts */
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="pt-8">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
