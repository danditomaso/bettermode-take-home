import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Nav } from "~/components";

describe("Nav", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      links: [
        { id: 1, name: "Home" },
        { id: 2, name: "About" },
      ],
      renderItem: (link: { id: number; name: string }) => (
        <li key={link.id}>{link.name}</li>
      ),
      ...props,
    };
    return render(<Nav {...defaultProps} />);
  };

  test("renders correctly with provided links", () => {
    setup();
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("returns null when no links are provided", () => {
    const { container } = setup({ links: [] });
    expect(container.firstChild).toBeNull();
  });

  test("uses renderItem function to render each link", () => {
    const renderItem = vi.fn((link) => <li key={link.id}>{link.name}</li>);
    setup({ renderItem });
    expect(renderItem).toHaveBeenCalledTimes(2);
    expect(renderItem).toHaveBeenCalledWith({ id: 1, name: "Home" });
    expect(renderItem).toHaveBeenCalledWith({ id: 2, name: "About" });
  });

  test("applies additional class names", () => {
    setup({ className: "custom-class" });
    const navElement = screen.getByRole("navigation");
    expect(navElement.firstChild).toHaveClass("custom-class");
  });
});
