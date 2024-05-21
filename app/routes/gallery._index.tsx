import type { MetaFunction } from "@remix-run/node";
import Card from "~/components/gallery/gallery-card";
import {
  GalleryList,
  GeneralErrorBoundary,
  GetMorePosts,
  LikeButton,
  LinkButton,
  Text,
} from "~/components";
import { useGalleryPagination } from "~/hooks";

export const meta: MetaFunction = () => {
  return [{ title: "Bettermode Take Home - Posts Gallery" }];
};

export default function GalleryHome() {
  const { data, error, getMorePosts, hasMorePosts } = useGalleryPagination();

  if (data?.posts?.nodes?.length === 0) throw new Error("No posts found");
  if (error?.message) throw new Error(error.message)

  return (
    <div className="flex flex-col gap-6 mt-16">
      <Text variant="h2">All Blog Posts</Text>
      <Text variant="p" className="text-balance w-full max-w-[80ch] block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, id
        libero. animi natus sapiente dicta corporis enim aperiam maxime!
      </Text>
      <GalleryList
        posts={data?.posts.nodes ?? []}
        getMorePosts={
          hasMorePosts ? (
            <GetMorePosts onClick={getMorePosts} text={"Get More Posts"} />
          ) : null
        }
        renderCard={(card) => {
          const cardReaction = card?.reactions.at(0);
          const isLiked = cardReaction?.reacted;
          const reactionsCount = cardReaction?.count;

          return (
            <Card title={card?.title}>
              <>
                <LikeButton
                  id={card?.id}
                  reactionsCount={reactionsCount ?? 0}
                  isLiked={isLiked ?? false}
                  className="absolute bottom-6 left-6"
                />
                <LinkButton
                  className="absolute bottom-6 right-6"
                  href={`/gallery/${card?.id}`}
                  text={"Read More"}
                />
              </>
            </Card>
          );
        }}
      />
    </div>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
