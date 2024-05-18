import { LoaderFunction, defer, type MetaFunction } from "@remix-run/node";
import posts from "~/posts.json";
import { gql } from "@urql/core";
import { client } from "~/utils/urql/client.server";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Card from "~/components/gallery/gallery-card";
import { Button, Gallery, LikeButton, LinkButton, Text } from "~/components";
import { siteSettings } from "~/config/siteSettings";
import { testIDs } from "~/tests/testIDs";

export const meta: MetaFunction = () => {
  return [
    { title: "Bettermode Take Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface GetPostsQuery {
  posts: {
    nodes: {
      id: string;
      title: string;
      publishedAt: Date;
      description: string;
      reactionsCount: number;
    }[];
  };
}

const GetPostsQueryDocument = gql`
  query GetPosts($limit: Int!, $spaceIds: [ID!]) {
    posts(limit: $limit, spaceIds: $spaceIds) {
      nodes {
        id
        title
        publishedAt
        description
        reactionsCount
      }
    }
  }
`;

export const loader = async (props: LoaderFunction) => {
  // const data = client
  //   .query<GetPostsQuery>(GetPostsQueryDocument, {
  //     limit: siteSettings.galleryLimts.homePageLimit,
  //     spaceIds: ["JTkErbfwxYwt"],
  //   })
  //   .toPromise();

  // return defer({ posts });

  const data = Promise.resolve(posts);
  return defer({
    posts: data,
  });
};

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="flex flex-col gap-6 mt-12">
        <Text variant="h2">Latest Blog Posts</Text>
        <Text variant="p" className="text-balance w-full max-w-[80ch] block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          id libero. animi natus sapiente dicta corporis enim aperiam maxime!
        </Text>
        <Await resolve={posts}>
          {(allPosts) => {
            return (
              <Gallery
                posts={allPosts?.data?.posts?.nodes ?? []}
                renderCard={(card) => (
                  <Card title={card?.title}>
                    <>
                      <LikeButton
                        reactionCount={card.reactionsCount.toString()}
                        href="/like"
                        isLiked={false}
                        className="absolute bottom-6 left-6"
                      />
                      <LinkButton
                        className="absolute bottom-6 right-6"
                        href={`/gallery/${card?.id}`}
                        text={"Read More"}
                      />
                    </>
                  </Card>
                )}
              />
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
}
