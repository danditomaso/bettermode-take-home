import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LikeButton, Text, UserInfo } from "~/components";
import { ArrowIcon } from "~/components/icons";
import { useGetGalleryPost, useNavigateBack } from "~/hooks";

export const meta: MetaFunction = () => {
  return [{ title: "Bettermode Take Home - Post Detail" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { postId } = params;
  if (!postId) {
    throw new Error("Post not found");
  }
  return { postId };
}

export default function GalleryDetailsPage() {
  const { navigateBack } = useNavigateBack();
  const { postId } = useLoaderData<typeof loader>()
  const { data, error } = useGetGalleryPost(postId);

  if (error?.message) throw new Error(error.message);

  const postReaction = data?.post?.reactions?.at(0)
  const isLiked = postReaction?.reacted ?? false;
  const postReactionCount = postReaction?.count ?? 0;

  return (
    <article className="flex flex-col gap-8 my-14 h-full">
      <button className="flex gap-4 p-3 -m-3 place-items-center cursor-pointer w-fit group:text-white border-none hover:bg-transparent" onClick={navigateBack} onKeyDown={navigateBack} type={"button"}>
        <ArrowIcon className={"size-4 rotate-180 hover:non"} />
        <Text variant="p" className="text-lg font-bold">
          Back
        </Text>
      </button>
      <Text variant="h2">{data?.post.title}</Text>
      <UserInfo
        name={data?.post?.createdBy?.member?.name ?? ""}
        publishedAt={data?.post?.publishedAt ?? new Date()}
      />
      <div>
        <LikeButton
          reactionsCount={postReactionCount ?? 0}
          id={data?.post?.id ?? ""}
          isLiked={isLiked ?? false}
        />
      </div>
      <Text variant="p" className="text-balance w-full max-w-[80ch] text-lg">
        {data?.post.description}
      </Text>
    </article>
  );
}


