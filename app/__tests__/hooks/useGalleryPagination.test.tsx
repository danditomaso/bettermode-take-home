import { renderHook, act, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useSearchParams } from "@remix-run/react";
import useGalleryPagination from "~/hooks/useGalleryPagination";
import { useQuery } from "~/graphql/client/gqlClient";
import { siteSettings } from "~/config/siteSettings";
import { CombinedError } from "urql";
import type { GetPostsQuery } from "~/graphql/queries/types";

// Mock the useQuery hook from ~/lib/urql/client
vi.mock("~/lib/urql/client", () => ({
  useQuery: vi.fn(),
}));

// Mock the useSearchParams hook from @remix-run/react
vi.mock("@remix-run/react", () => ({
  useSearchParams: vi.fn(),
}));

describe("useGalleryPagination", () => {
  const mockData = {
    posts: {
      totalCount: 20,
      nodes: [
        { id: "1", title: "Post 1", reactions: [{ reacted: false, count: 0 }], createdBy: { member: { name: "John Doe" } }, publishedAt: new Date(), description: "Description 1", member: { name: "John Doe" } },
        { id: "2", title: "Post 2", reactions: [{ reacted: false, count: 0 }], createdBy: { member: { name: "Jane Doe" } }, publishedAt: new Date(), description: "Description 2", member: { name: "Jane Doe" } },
      ],
    },
  };


  const mockInitialLimit = siteSettings.limits.galleryPageLimit;
  const setSearchParams = vi.fn();

  const setup = ({
    data = undefined,
    error = undefined,
    fetching = false,
  }: {
    data?: GetPostsQuery | undefined;
    error?: CombinedError | undefined;
    fetching?: boolean;
  } = {}) => {
    vi.mocked(useQuery).mockReturnValue([
      { data, error, fetching, stale: false },
      vi.fn(),
    ]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(`limit=${mockInitialLimit}`),
      setSearchParams,
    ]);
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should return data and pagination information when the query is successful", () => {
    setup({ data: mockData });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.currentLimit).toBe(mockInitialLimit);
    expect(result.current.hasMorePosts).toBe(true);
    expect(result.current.error).toBe(undefined);
  });

  it("should handle error scenario", () => {
    const mockError = new CombinedError({
      networkError: new Error("Network Error"),
    });


    setup({ error: mockError, data: undefined });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(mockError);
  });

  it("should return undefined data when the query has no result", () => {
    setup({ data: undefined, error: undefined });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toEqual(undefined);
    expect(result.current.currentLimit).toBe(mockInitialLimit);
    expect(result.current.hasMorePosts).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  it("should indicate fetching state correctly", () => {
    setup({ fetching: true });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toEqual(undefined);
    expect(result.current.hasMorePosts).toBe(false);
    expect(result.current.error).toBe(undefined);
  });
})
