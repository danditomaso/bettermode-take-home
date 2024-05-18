import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Gallery } from "~/components/";
import { testIDs } from "~/tests/testIDs";

describe("Gallery", () => {
  // Ensure the DOM is clean after each test
  afterEach(() => {
    cleanup();
  });

  const renderCard = (post: { id: string; title: string }) => (
    <div data-testid={`post-${post.id}`}>{post?.title}</div>
  );

  const setup = (props = {}) => {
    const defaultProps = {
      posts: [],
      renderCard,
      ...props,
    };
    return render(<Gallery {...defaultProps} />);
  };

  test("renders 'No posts found' when there are no posts", () => {
    setup();
    const emptyState = screen.getByTestId(testIDs.gallery.emptyState);
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent("No posts found");
  });

  test("renders the list of posts when there are posts", () => {
    const posts = [
      { id: "1", title: "Post 1" },
      { id: "2", title: "Post 2" },
    ];
    setup({ posts });

    const postContainer = screen.getByTestId(testIDs.gallery.postContainer);
    expect(postContainer).toBeInTheDocument();
    expect(screen.getByTestId("post-1")).toHaveTextContent("Post 1");
    expect(screen.getByTestId("post-2")).toHaveTextContent("Post 2");
  });
});
