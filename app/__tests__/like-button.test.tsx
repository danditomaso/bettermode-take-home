import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { testIDs } from "~/tests/testIDs";
import { LikeButton } from "~/components/";
import { useFetcher } from "@remix-run/react";

// Mock the useFetcher hook
vi.mock("@remix-run/react", () => ({
  useFetcher: vi.fn(() => ({
    formData: new FormData(),
    submit: vi.fn(),
  })),
}));

// TODO: Come back to this test and determine why its failing and fix it
describe.skip("LikeButton Component", () => {
  it("should render correctly with initial props", () => {
    const { getByTestId } = render(
      <LikeButton
        reactionCount="10"
        isLiked={false}
        href="/like"
        className="test-class"
      />
    );

    const likeButton = getByTestId(testIDs.galleryCard.likeButton);
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent("♡");
    expect(likeButton).toHaveTextContent("10");
  });

  it("should toggle like status on click", () => {
    const mockSubmit = vi.fn();
    (useFetcher as any).mockReturnValue({
      formData: new FormData(),
      submit: mockSubmit,
    });

    const { getByTestId, rerender } = render(
      <LikeButton
        reactionCount="10"
        isLiked={false}
        href="/like"
        className="test-class"
      />
    );

    const likeButton = getByTestId(testIDs.galleryCard.likeButton);

    // Initial state
    expect(likeButton).toHaveTextContent("♡");
    expect(likeButton).toHaveTextContent("10");

    // Simulate click to like
    fireEvent.click(likeButton);
    expect(mockSubmit).toHaveBeenCalledWith({ liked: "true" }, undefined);

    // Update state to liked
    rerender(
      <LikeButton
        reactionCount="10"
        isLiked={true}
        href="/like"
        className="test-class"
      />
    );

    expect(likeButton).toHaveTextContent("♥");
    expect(likeButton).toHaveTextContent("10");

    // Simulate click to unlike
    fireEvent.click(likeButton);
    expect(mockSubmit).toHaveBeenCalledWith({ liked: "false" }, undefined);
  });

  it("should display the correct reaction count", () => {
    const { getByTestId } = render(
      <LikeButton
        reactionCount="5"
        isLiked={true}
        href="/like"
        className="test-class"
      />
    );

    const likeButton = getByTestId(testIDs.galleryCard.likeButton);
    expect(likeButton).toHaveTextContent("♥");
    expect(likeButton).toHaveTextContent("5");
  });
});
