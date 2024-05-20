import type React from "react";
import { renderHook, act } from "@testing-library/react";
import { useGalleryPagination } from "~/hooks/";
import { useQuery } from "~/lib/urql/client";
import { createClient, Provider } from "urql";
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useSearchParams } from "@remix-run/react";

// Mock siteSettings
vi.mock("~/config/siteSettings", () => ({
  siteSettings: {
    limits: {
      galleryPageLimit: 10,
    },
  },
}));

// Mock urql client
const mockClient = createClient({
  url: "http://mock-api.com/graphql",
  exchanges: [],
});

vi.mock("../lib/urql/client", () => ({
  useQuery: vi.fn(),
}));

// Mock useSearchParams
vi.mock("@remix-run/react", () => ({
  useSearchParams: vi.fn(),
}));

type ProviderProps = {
  children: React.ReactNode;
};

describe("useGalleryPagination", () => {
  const mockData = {
    posts: {
      totalCount: 50,
    },
  };

  beforeEach(() => {
    // Mocking the return value of useQuery
    const mockUseQuery = useQuery as Mock;
    mockUseQuery.mockReturnValue([{ data: mockData }]);

    // Mocking useSearchParams
    const mockUseSearchParams = useSearchParams as Mock;
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("?limit=10"),
      vi.fn(),
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default limit", () => {
    const { result } = renderHook(() => useGalleryPagination(), {
      wrapper: ({ children }: ProviderProps) => (
        <Provider value={mockClient}>{children}</Provider>
      ),
    });

    expect(result.current.currentLimit).toBe(10);
  });

  it("should return data and hasMorePosts correctly", () => {
    const { result } = renderHook(() => useGalleryPagination(), {
      wrapper: ({ children }: ProviderProps) => (
        <Provider value={mockClient}>{children}</Provider>
      ),
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.hasMorePosts).toBe(true);
  });

  it("should update search params when getMorePosts is called", () => {
    const mockSetSearchParams = vi.fn();
    const mockUseSearchParams = useSearchParams as Mock;
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("?limit=10"),
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => useGalleryPagination(), {
      wrapper: ({ children }: ProviderProps) => (
        <Provider value={mockClient}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.getMorePosts();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ limit: "21" });
  });
});
act(() => {
  result.current.getMorePosts();
});

expect(mockSetSearchParams).toHaveBeenCalledWith({ limit: "21" });
	});
});
act(() => {
  result.current.getMorePosts();
});

expect(mockSetSearchParams).toHaveBeenCalledWith({ limit: "21" });
	});
});
act(() => {
  result.current.getMorePosts();
});

expect(mockSetSearchParams).toHaveBeenCalledWith({ limit: "21" });
	});
});
act(() => {
  result.current.getMorePosts();
});

expect(mockSetSearchParams).toHaveBeenCalledWith({ limit: "21" });
	});
});
