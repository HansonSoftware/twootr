import { RouterOutputs, api } from "~/utils/api";
import { Header } from "~/components/Header";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage, LoadingSpinner } from "~/components/LoadingSpinner";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { NextPage } from "next";
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
      <Toaster position="bottom-center" />
      <div className="flex w-full flex-col gap-2">
        <Header />
        <CreatePost />
        <Feed />
      </div>
    </>
  );
};

export default Home;

const CreatePost = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: () => {
      toast.custom((t) => (
        <div className="toast-center toast w-full max-w-xs">
          <div className="alert alert-warning">
            <div>
              <span>Failed to post, please try again later.</span>
            </div>
          </div>
        </div>
      ));
    },
  });

  if (!user) return null;

  return (
    <div className="flex items-center gap-1 p-2 pt-24">
      <img src={user.profileImageUrl} className="h-12 w-12 rounded-full" />
      <input
        type="text"
        placeholder="Leave a message..."
        className="input w-full cursor-text outline-none focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {!isPosting && (
        <button
          className="btn-outline btn-info btn-sm btn"
          onClick={() => mutate({ content: input })}
          disabled={isPosting || input === "" || input.length > 280}
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  const userId = useUser().user?.id;

  return (
    <article id={post.id} className="w-full p-2">
      {author.id !== userId && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <Link href={`/@${author.username}`} className="w-10 rounded-full">
              <img
                src={author?.profileImageUrl}
                alt={`@${author.username}'s profile picture`}
                className="rounded-full"
              />
            </Link>
          </div>
          <Link href={`/post/${post.id}`}>
            <div className="chat-bubble chat-bubble-info">{post.content}</div>
          </Link>
          <div className="chat-footer">
            <Link
              href={`/@${author.username}`}
            >{`@${author?.username} · `}</Link>
            <Link href={`/post/${post.id}`}>
              <time className="text-xs opacity-50">
                {dayjs(post.createdAt).fromNow()}
              </time>
            </Link>
          </div>
        </div>
      )}
      {author.id === userId && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <Link href={`/@${author.username}`} className="w-10 rounded-full">
              <img
                src={author?.profileImageUrl}
                alt={`@${author.username}'s profile picture`}
                className="rounded-full"
              />
            </Link>
          </div>
          <Link href={`/post/${post.id}`}>
            <div className="chat-bubble chat-bubble-primary">
              {post.content}
            </div>
          </Link>
          <div className="chat-footer">
            <Link
              href={`/@${author.username}`}
            >{`@${author?.username} · `}</Link>
            <Link href={`/post/${post.id}`}>
              <time className="text-xs opacity-50">
                {dayjs(post.createdAt).fromNow()}
              </time>
            </Link>
          </div>
        </div>
      )}
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
