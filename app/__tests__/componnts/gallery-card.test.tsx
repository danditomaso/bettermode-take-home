import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Card } from "~/components";
import { testIDs } from "~/tests/testIDs";

describe("Gallery Card", () => {
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      title: "Test Title",
      children: <div data-testid="card-children">Test Children</div>,
      ...props,
    };
    return render(<Card {...defaultProps} />);
  };

  test("renders correctly with given title and children", () => {
    setup();
    const cardTitle = screen.queryByTestId(testIDs.galleryCard.title);
    const cardChildren = screen.queryByTestId("card-children");

    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent("Test Title");
    expect(cardChildren).toBeInTheDocument();
    expect(cardChildren).toHaveTextContent("Test Children");
  });

  test("renders the title correctly", () => {
    setup({ title: "New Title" });
    const cardTitle = screen.queryByTestId(testIDs.galleryCard.title);
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent("New Title");
  });

  test("renders the children correctly", () => {
    setup({ children: <div data-testid="new-children">New Children</div> });
    const cardChildren = screen.queryByTestId("new-children");
    expect(cardChildren).toBeInTheDocument();
    expect(cardChildren).toHaveTextContent("New Children");
  });

  test("does not render if children is not provided", () => {
    const { container } = setup({ children: null });
    expect(container.firstChild).toBeNull();
  });
});
