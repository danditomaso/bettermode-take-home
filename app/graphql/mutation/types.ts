export interface AddPostReactionVariables {
  postId: string;
  input: {
    reaction: "upvote";
  };
}

export interface AddPostReactionMutationResponse {
  data: {
    addReaction: {
      status: string;
      __typename: string;
    };
  };
}

export interface RemovePostReactionVariables {
  postId: string;
  reaction: string;
}

export interface RemovePostReactionMutationResponse {
  data: {
    removeReaction: {
      status: string;
      __typename: string;
    };
  };
}
