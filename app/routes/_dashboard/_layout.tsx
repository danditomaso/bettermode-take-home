import { defer, type MetaFunction } from "@remix-run/node";
import { gql } from "@urql/core";
import { client } from "~/utils/graphql/client.server";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface GetPostsQuery {
  posts: {
    nodes: {
      id: string;
      title: string;
    };
  };
}

const GetPostsQueryDocument = gql`
  query GetPosts($limit: Int!, $spaceIds: [ID!]) {
    posts(limit: $limit, spaceIds: $spaceIds) {
      nodes {
        imageIds
        title
        description
      }
    }
  }
`;

export const loader = async () => {
  const posts = client
    .query<GetPostsQuery>(GetPostsQueryDocument, {
      limit: 6,
      spaceIds: ["JTkErbfwxYwt"],
    })
    .toPromise();

  // using a remix built-in function to support streaming
  return defer({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Await resolve={posts}>
        {(posts) => JSON.stringify(posts?.data?.posts.nodes, null, 2)}
      </Await>
    </Suspense>
  );
}
