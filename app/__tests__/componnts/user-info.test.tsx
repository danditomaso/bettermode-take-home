import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { UserInfo } from "~/components/";
import { testIDs } from "~/tests/testIDs";
import { formatDate } from "~/lib/dates/date";

// Mock the formatDate function
vi.mock("~/lib/dates/date", () => ({
  formatDate: vi.fn(),
}));

describe("UserInfo", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });

  const name = "John Doe";
  const publishedAt = new Date("2023-05-19T12:34:56Z");
  const formattedDate = "May 19, 2023";

  beforeEach(() => {
    // Mock the formatDate function to return the expected formatted date
    vi.mocked(formatDate).mockReturnValue(formattedDate);
  });

  it("should render the name and formatted date correctly", () => {
    render(<UserInfo name={name} publishedAt={publishedAt} />);

    const nameElement = screen.getByTestId(testIDs.userInfo.name);
    const dateElement = screen.getByTestId(testIDs.userInfo.date);

    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(name);

    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveTextContent(formattedDate);
  });
});
