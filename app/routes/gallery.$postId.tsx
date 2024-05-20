import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LikeButton, Text, UserInfo } from "~/components";
import { useGetGalleryPost } from "~/hooks";

export const meta: MetaFunction = () => {
  return [{ title: "Bettermode Take Home" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { postId } = params;

  if (!postId) {
    throw new Error("Post not found");
  }

  return { postId };
}

function GalleryDetailsPage() {
  const { postId } = useLoaderData<typeof loader>();
  const { data } = useGetGalleryPost(postId);

  const postReaction = data?.post.reactions.at(0)
  const isLiked = postReaction?.reacted;
  const postReactionCount = postReaction?.count;

  return (
    <article className="flex flex-col gap-8 my-14 h-full">
      <Text variant="h2">{data?.post.title}</Text>
      <UserInfo
        name={data?.post?.createdBy?.member?.name ?? ""}
        publishedAt={data?.post?.publishedAt ?? new Date()}
      />
      <div>
        <LikeButton
          reactionsCount={postReactionCount ?? 0}
          id={data?.post.id ?? ""}
          isLiked={isLiked ?? false}
        />
      </div>
      <Text variant="p" className="text-balance w-full max-w-[80ch] text-lg">
        {data?.post.description}
      </Text>
    </article>
  );
}

export default GalleryDetailsPage;
