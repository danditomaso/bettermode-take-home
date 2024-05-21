import { useMutation } from "~/lib/urql/client";
import {
  addPostReactionMutation,
  removePostReactionMutation,
} from "~/graphql/mutation";
import type {
  AddPostReactionMutationResponse,
  AddPostReactionVariables,
  RemovePostReactionMutationResponse,
  RemovePostReactionVariables,
} from "~/graphql/mutation/types";

function useAddPostReaction() {
  const [addReactionResult, addReaction] = useMutation<
    AddPostReactionMutationResponse,
    AddPostReactionVariables
  >(addPostReactionMutation);

  return { addReactionResult, addReaction };
}

function useRemovePostReaction() {
  const [removeReactionResult, removeReaction] = useMutation<
    RemovePostReactionMutationResponse,
    RemovePostReactionVariables
  >(removePostReactionMutation);

  return { removeReaction, removeReactionResult };
}

export { useAddPostReaction, useRemovePostReaction };
