import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Button } from "~/components/";

describe("Button", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      size: "base" as "small" | "base" | "large",
      type: "button" as "button" | "submit",
      children: "Click Me",
      ...props,
    };
    return render(<Button {...defaultProps} />);
  };

  test("renders correctly with given props", () => {
    setup();
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button).toHaveAttribute("type", "button");
  });

  test("renders with an icon if provided", () => {
    setup({ icon: <span data-testid="icon" /> });
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  test("spreads additional props correctly", () => {
    setup({ "data-testid": "button-element" });
    const button = screen.getByTestId("button-element");
    expect(button).toBeInTheDocument();
  });

  test("handles type attribute correctly", () => {
    setup({ type: "submit" });
    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("type", "submit");
  });
});
