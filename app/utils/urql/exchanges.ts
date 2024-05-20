import { type ClientOptions, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

// const invalidatePosts = (cache: Cache) => {
//   const allFields = cache.inspectFields("Query");

//   // Get all fields that are posts
//   const fieldPosts = allFields.filter(
//     (info) => info.fieldName === "posts"
//   );

//   // Invalidate all posts
//   fieldPosts.forEach((fi) => {
//     cache.invalidate("Query", "paginatedPosts", fi.arguments || null)
//   });
// };

export const getUrqlExchanges: ClientOptions["exchanges"] = [
  cacheExchange({
    keys: {
      // Post entity uses postId instead of id which causes a warning in the console
      Posts: () => null,
      PaginatedPost: () => null,
      SpaceMember: () => null,
      PostReactionDetail: () => null,
    },
    // updates: {
    //   Mutation: {
    //     addReaction: (_result, vars, cache) => {
    //       const data: { id: string, __typename: string, reactions: { reacted: boolean, count: number, __typename: string }[] } = cache.readFragment(postReactionFragment, {
    //         id: vars?.postId,
    //       });

    //       cache.writeFragment(postReactionFragment, {
    //         id: data?.id,
    //         __typename: data.__typename,
    //         reactions: {
    //           __typename: data.__typename,
    //           reacted: !data.reactions[0]?.reacted,
    //           count: data.reactions[0]?.count + 1,
    //         }
    //       })
    //       invalidatePosts(cache);
    //     },
    //     removeReaction: (_result, vars, cache) => {
    //       const data: { id: string, __typename: string, reactions: { reacted: boolean, count: number, __typename: string }[] } = cache.readFragment(postReactionFragment, {
    //         id: vars?.postId,
    //       });

    //       cache.writeFragment(postReactionFragment, {
    //         id: data?.id,
    //         __typename: data.__typename,
    //         reactions: {
    //           __typename: data.__typename,
    //           reacted: !data.reactions[0]?.reacted,
    //           count: data.reactions[0]?.count - 1,
    //         }
    //       })
    //       invalidatePosts(cache);
    //     }
    //   },
    // },
  }),
  fetchExchange,
];
