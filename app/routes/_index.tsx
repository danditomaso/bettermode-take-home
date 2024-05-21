import type { MetaFunction } from "@remix-run/node";
import Card from "~/components/gallery/gallery-card";
import { GalleryList, GeneralErrorBoundary, LikeButton, LinkButton, Text } from "~/components";
import { useGalleryPagination } from "~/hooks";
import { siteSettings } from "~/config/siteSettings";
import { Link } from "@remix-run/react";
import { ArrowIcon } from "~/components/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Bettermode Take Home" },
  ];
};

export default function Home() {
  const { data, error } = useGalleryPagination(siteSettings.limits.homePageLimit);
  if (data?.posts?.nodes?.length === 0) throw new Error("No posts found");
  if (error?.message) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6 mt-16">
      <Text variant="h2">Latest Blog Posts</Text>
      <Text variant="p" className="text-balance w-full max-w-[80ch] block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, id
        libero. animi natus sapiente dicta corporis enim aperiam maxime!
      </Text>
      <GalleryList
        posts={data?.posts.nodes ?? []}
        getMorePosts={null}
        renderCard={(card) => {
          const cardReaction = card?.reactions.at(0);
          const isLiked = cardReaction?.reacted;
          const reactionsCount = cardReaction?.count;

          return (
            <>
              <Card title={card?.title}>
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
              </Card>

            </>
          );
        }}
      />
      <Link to={`/gallery/`} className="flex gap-4 ml-auto p-3 -m-3">
        <Text variant="p" className="underline text-xl font-bold">
          All Posts
        </Text>
        <ArrowIcon className={"size-8"} />
      </Link >
    </div>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
