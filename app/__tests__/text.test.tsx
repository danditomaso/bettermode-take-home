import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Text } from "~/components";
import { cn } from "~/utils/style";

describe("Text", () => {
  // Ensure the DOM is clean after each test
  afterEach(() => {
    cleanup();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      children: "Test Text",
      ...props,
    };
    return render(<Text {...defaultProps} variant="h2" />);
  };

  test("renders correctly with given variant and children", () => {
    setup();
    const textElement = screen.getByText("Test Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("h2");
  });

  test("applies the correct classes based on variant prop", () => {
    setup({ variant: "h2" });
    const textElement = screen.getByText("Test Text");
    expect(textElement).toHaveClass(
      cn("text-6xl font-extrabold tracking-wide text-black")
    );
  });

  test("applies additional className props", () => {
    setup({ className: "custom-class" });
    const textElement = screen.getByText("Test Text");
    expect(textElement).toHaveClass("custom-class");
  });

  test("spreads additional props correctly", () => {
    setup({ "data-testid": "text-element" });
    const textElement = screen.getByTestId("text-element");
    expect(textElement).toBeInTheDocument();
  });
});
