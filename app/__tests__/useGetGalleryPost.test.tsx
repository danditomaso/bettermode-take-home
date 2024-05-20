import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useGetGalleryPost from "~/hooks/useGetGalleryPost";
import { useQuery } from "~/utils/urql/client";

// Mock the useQuery hook from ~/utils/urql/client
vi.mock("~/utils/urql/client", () => ({
  useQuery: vi.fn(),
}));

describe.skip("useGetGalleryPost", () => {
  const mockData = { post: { id: "1", title: "Test Post" } };
  const mockError = { message: "Error" }

  it("should return data when the query is successful", () => {
    // Mock the implementation of useQuery to return the expected data
    vi.mocked(useQuery).mockReturnValue([{ data: mockData, error: undefined }]);

    const { result } = renderHook(() => useGetGalleryPost("1"));

    expect(result.current.data).toEqual(mockData);
  });

  it("should log an error when the query fails", () => {
    // Mock console.error
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    // Mock the implementation of useQuery to return an error
    vi.mocked(useQuery).mockReturnValue([{ data: null, fetching: false, stale: false, error: { graphQLErrors: [], name: '', message: 'an error occured' } }]);

    renderHook(() => useGetGalleryPost("1"));

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it("should return undefined data when the query has no result", () => {
    // Mock the implementation of useQuery to return no data
    vi.mocked(useQuery).mockReturnValue([{ data: null, error: null }]);

    const { result } = renderHook(() => useGetGalleryPost("1"));

    expect(result.current.data).toBeUndefined();
  });
});
