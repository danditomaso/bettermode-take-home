import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, test } from "vitest";
import { LinkButton } from "~/components/";
import { testIDs } from "~/tests/testIDs";

describe("LinkButton", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      href: "/post/1",
      text: "Read More",
      className: "",
      ...props,
    };
    return render(
      <MemoryRouter>
        <LinkButton {...defaultProps} />
      </MemoryRouter>
    );
  };

  test("renders correctly with given props", () => {
    setup();
    const button = screen.getByTestId(testIDs.galleryCard.gotoPostButton);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Read More");
  });

  test("displays the correct text", () => {
    setup({ text: "Learn More" });
    const button = screen.getByTestId(testIDs.galleryCard.gotoPostButton);
    expect(button).toHaveTextContent("Learn More");
  });

  test("links to the correct URL", () => {
    setup({ href: "/post/2" });
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/post/2");
  });

  test("applies additional class names", () => {
    setup({ className: "custom-class" });
    const button = screen.getByTestId(testIDs.galleryCard.gotoPostButton);
    expect(button).toHaveClass("custom-class");
  });
});
