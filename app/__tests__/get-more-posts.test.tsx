import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GetMorePosts } from "~/components/";

// Mock the Arrow component
vi.mock("~/components/icons/arrow", () => ({
  default: vi.fn(() => <div data-testid="arrow-icon" />),
}));

describe("GetMorePosts", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });
  const mockOnClick = vi.fn();

  it("renders with default text", () => {
    render(<GetMorePosts onClick={mockOnClick} text="Show More" />);

    expect(screen.getByText("Show More")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    render(<GetMorePosts onClick={mockOnClick} text="Show More" />);

    const button = screen.getByRole("button", { name: /show more/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("accepts additional props", () => {
    render(
      <GetMorePosts
        onClick={mockOnClick}
        text="Show More"
        data-testid="custom-element"
      />
    );

    expect(screen.getByTestId("custom-element")).toBeInTheDocument();
  });

  it("renders with provided text", () => {
    render(<GetMorePosts onClick={mockOnClick} text="Load More Posts" />);

    expect(screen.getByText("Load More Posts")).toBeInTheDocument();
  });
});
