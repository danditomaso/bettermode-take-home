import { gql } from "urql";

export const postReactionFragment = gql`
  fragment PostReaction on Post {
    id
    __typename
    reactions {
      reacted
      count
      __typename
      }
   }
      `