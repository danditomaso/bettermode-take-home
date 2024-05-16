import { cleanup, render, screen } from "@testing-library/react";
import { GetMoreCard } from "~/components";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, test, vi } from "vitest";

// Mocking the Arrow component
vi.mock("~/components/icons/arrow", () => ({
  default: () => <svg data-testid="arrow-icon" />,
}));

describe("GetMoreCard", () => {
  // Ensure the DOM is clean after each test
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      href: "/more-posts",
      text: "Show More",
      ...props,
    };
    return render(
      <BrowserRouter>
        <GetMoreCard {...defaultProps} />
      </BrowserRouter>
    );
  };

  test("renders correctly with given props", () => {
    setup();
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
  });

  test("renders with the correct text", () => {
    setup({ text: "Load More" });
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("links to the correct URL", () => {
    setup({ href: "/more-posts" });
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/more-posts");
  });

  test("button contains the Arrow icon", () => {
    setup();
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toBeInTheDocument();
  });
});
