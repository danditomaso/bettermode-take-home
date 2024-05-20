import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useSearchParams } from "@remix-run/react";
import useGalleryPagination from "~/hooks/useGalleryPagination";
import { useQuery } from "~/lib/urql/client";
import { siteSettings } from "~/config/siteSettings";
import { GetPostsQuery, GetPostsQueryVariables } from "~/graphql/queries/types";

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
      totalCount: 100,
      edges: [
        { id: "1", title: "Post 1" },
        { id: "2", title: "Post 2" },
      ],
    },
  };
  const mockInitialLimit = siteSettings.limits.galleryPageLimit;
  const mockError = new Error("Test Error");
  const setSearchParams = vi.fn();

  const setup = ({ data = mockData, error = { name: "", message: "", graphQLErrors: [] }, fetching = false, stale = false } = {}) => {
    vi.mocked(useQuery).mockReturnValue([{ data, error, fetching, stale }]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(`limit=${mockInitialLimit}`),
      setSearchParams,
    ]);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return data and pagination information when the query is successful", () => {
    setup();

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.currentLimit).toBe(mockInitialLimit);
    expect(result.current.hasMorePosts).toBe(true);
  });

  it("should update search parameters correctly when getMorePosts is called", () => {
    setup();

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    act(() => {
      result.current.getMorePosts();
    });

    const expectedNewLimit = Math.min(mockInitialLimit + mockInitialLimit + 1, mockData.posts.totalCount);
    expect(setSearchParams).toHaveBeenCalledWith({ limit: expectedNewLimit.toString() });
  });

  it("should handle error scenario", () => {
    // Mock console.error
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    setup({ error: mockError });

    renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it("should return undefined data when the query has no result", () => {
    setup({ data: null });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toBeUndefined();
    expect(result.current.currentLimit).toBe(mockInitialLimit);
    expect(result.current.hasMorePosts).toBe(false);
  });

  it("should indicate fetching state correctly", () => {
    setup({ fetching: true });

    const { result } = renderHook(() => useGalleryPagination(mockInitialLimit));

    expect(result.current.data).toBeUndefined();
    expect(result.current.hasMorePosts).toBe(false);
  });
});
