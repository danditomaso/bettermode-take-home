import { type ClientOptions, fetchExchange } from "urql";
import {
  type Cache,
  cacheExchange,
  type NullArray,
  type Scalar,
  type ScalarObject,
  type Variables,
} from "@urql/exchange-graphcache";
import schema from "./schema.json";
import { getPostsQueryDocument } from "~/graphql/queries";

const invalidatePosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");

  // Get all fields that are posts
  const fieldPosts = allFields.filter((info) => info.fieldName === "posts");

  // Invalidate all posts
  fieldPosts.forEach((fi) => {
    cache.invalidate("Query", "paginatedPosts", fi.arguments || null);
  });
};

export const getUrqlExchanges: ClientOptions["exchanges"] = [
  cacheExchange({
    schema,
    keys: {
      PaginatedPost: () => null,
      Post: () => null,
      SpaceMember: () => null,
      PostReactionDetail: () => null,
    },
    updates: {
      Mutation: {
        addReaction: (_result, vars, cache) => {
          // the updater function is called with the result of the mutation, the variables of the mutation and the cache
          cache.updateQuery(
            {
              query: getPostsQueryDocument,
              variables: {
                limit: 3,
                spaceIds: [import.meta.env.VITE_SPACE_ID ?? ""],
              },
            },
            (data) => {
              // find the post that was reacted to and update the value
              data.posts.nodes.forEach(
                (post: {
                  id:
                  | string
                  | number
                  | boolean
                  | Variables
                  | ScalarObject
                  | Scalar[]
                  | NullArray<Variables>
                  | null;
                  reactions: { count: number }[];
                }) => {
                  // if the post id matches the id of the post that was reacted to
                  if (post.id === vars?.postId) {
                    if (post.reactions.at(0)) {
                      post.reactions[0].count = post.reactions[0].count + 1;
                    }
                    // if the post has no reactions, create a new reaction
                    const newReaction = {
                      __typename: "PostReactionDetail",
                      id: vars?.reactionId,
                      reacted: true,
                      count: 1,
                    };

                    post.reactions.push(newReaction);
                  }
                },
              );
              return {
                ...data,
              };
            },
          );

          // an invalidation is needed to update the cache I think?
          invalidatePosts(cache);
        },
        // removeReaction: (_result, vars, cache) => {
        //   cache.updateQuery(
        //     {
        //       query: getPostsQueryDocument,
        //       variables: {
        //         limit: 10,
        //         spaceIds: ["JTkErbfwxYwt"],
        //       },
        //     },
        //     (data) => {
        //       // find the post that was reacted to and update the value
        //       data.posts.nodes.forEach(
        //         (post: {
        //           id:
        //           | string
        //           | number
        //           | boolean
        //           | Variables
        //           | ScalarObject
        //           | Scalar[]
        //           | NullArray<Variables>
        //           | null;
        //           reactions: { count: number, reacted: boolean }[];
        //         }) => {
        //           // if the post id matches the id of the post that was reacted to
        //           if (post.id === vars?.postId) {
        //             if (post.reactions.at(0)?.count === 1) {
        //               post.reactions.slice(0, 1);
        //             } else {
        //               // 
        //               post.reactions[0].count = post.reactions[0].count - 1;
        //               post.reactions[0].reacted = false
        //             }

        //           }
        //         },
        //       );


        //       return {
        //         ...data,
        //       };
        //     },
        //   );

        //   invalidatePosts(cache);
        // },
      },
    },
  }),
  fetchExchange,
];
