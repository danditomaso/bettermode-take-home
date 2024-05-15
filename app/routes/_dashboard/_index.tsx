import { defer, type MetaFunction } from "@remix-run/node";
import { gql } from "@urql/core";
import { client } from "~/utils/urql/client.server";
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
        reactionsCount
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
  return defer({ posts });
};

export default function Index() {
  // 		const [result] = useQuery<GetPostsQuery>({ query: GetPostsQueryDocument, variables: {
  // 		"limit": 6,
  // 		"spaceIds": [
  // 			"JTkErbfwxYwt"
  // 		],
  // }})

  const { posts } = useLoaderData<typeof loader>();
  // console.log(result.data?.posts.nodes);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={posts}>
          {(posts) => JSON.stringify(posts?.data?.posts.nodes, null, 2)}
        </Await>
      </Suspense>
    </div>
  );
}
