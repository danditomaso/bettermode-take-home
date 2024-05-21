import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useNavigate } from "@remix-run/react";
import useNavigateBack from "~/hooks/useNavigateBack";

// Mock the useNavigate hook from @remix-run/react
vi.mock("@remix-run/react", () => ({
  useNavigate: vi.fn(),
}));

describe("useNavigateBack", () => {
  it("should call navigate with -1 when navigateBack is called", () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const { result } = renderHook(() => useNavigateBack());

    act(() => {
      result.current.navigateBack();
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
