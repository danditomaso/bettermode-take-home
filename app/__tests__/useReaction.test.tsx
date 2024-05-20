import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  useAddPostReaction,
  useRemovePostReaction,
} from "~/hooks/usePostReaction";
import { useMutation } from "~/utils/urql/client";
import type {
  AddPostReactionVariables,
  RemovePostReactionVariables,
} from "~/graphql/mutation/types";

vi.mock("~/utils/urql/client", () => ({
  useMutation: vi.fn(),
}));

describe("useAddPostReaction", () => {
  const mockAddReaction = vi.fn();

  beforeEach(() => {
    vi.mocked(useMutation).mockReturnValue([{ data: {}, fetching: false, stale: false, error: { message: "", name: "", graphQLErrors: [] } }, mockAddReaction]);

  })
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call addReaction with correct variables", async () => {
    const { result } = renderHook(() => useAddPostReaction());

    const variables: AddPostReactionVariables = {
      input: {
        participantId: "gpwNvm70TU",
        reaction: "upvote",
      },
      postId: "test-post",
    };

    act(() => {
      result.current.addReaction(variables);
    });

    expect(mockAddReaction).toHaveBeenCalledWith(variables);
  });
});

describe("useRemovePostReaction", () => {
  const mockRemoveReaction = vi.fn();

  beforeEach(() => {
    vi.mocked(useMutation).mockReturnValue([{ data: {}, fetching: false, stale: false, error: { message: "", name: "", graphQLErrors: [] } }, mockRemoveReaction]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call removeReaction with correct variables", async () => {
    const { result } = renderHook(() => useRemovePostReaction());

    const variables: RemovePostReactionVariables = {
      postId: "test-post",
      reaction: "upvote",
      participantId: "gpwNvm70TU",
    };

    act(() => {
      result.current.removeReaction(variables);
    });

    expect(mockRemoveReaction).toHaveBeenCalledWith(variables);
  });
});
