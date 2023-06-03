import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
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
            <div className="chat-bubble chat-bubble-secondary">
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
