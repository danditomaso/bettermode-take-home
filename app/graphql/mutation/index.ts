import { gql } from "urql";

export const addPostReactionMutation = gql`
  mutation addPostReaction($postId: ID!, $input: AddReactionInput!) {
    addReaction(postId: $postId, input: $input) {
      status
      __typename
    }
  }
`;

export const removePostReactionMutation = gql`
  mutation removePostReaction(
    $postId: ID!
    $reaction: String!
  ) {
    removeReaction(
      postId: $postId
      reaction: $reaction
    ) {
      status
      __typename
    }
  }
`;
