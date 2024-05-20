import { gql } from "urql";

export const getPostsQueryDocument = gql`
  query GetPosts($limit: Int!, $spaceIds: [ID!]) {
    posts(limit: $limit, spaceIds: $spaceIds) {
      __typename
      totalCount
      nodes {
        id
        title
        publishedAt
        description
        reactions {
          reacted
          count
          __typename
        }
        createdBy {
          member {
            name
            id
            __typename
          }
        }
      }
    }
  }
`;

export const getPostQueryDocument = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      reactions {
        reacted
        count
      }
      createdBy {
        member {
          name
          id
        }
      }
      id
      title
      description
    }
  }
`;
