export interface AddPostReactionVariables {
  postId: string;
  input: {
    participantId: string;
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
  participantId: string;
  reaction: string;
}

export interface RemovePostReactionMutationResponse {
  data: {
    removeReaction: {
      status: string;
    };
  };
}
