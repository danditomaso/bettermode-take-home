import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, test } from "vitest";
import { Header } from "~/components/";
import { siteSettings } from "~/config/siteSettings";

describe("Header", () => {
  // Ensure the DOM is cleaned up after each test
  afterEach(() => {
    cleanup();
  });

  const setup = () => {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  test("renders the correct site name", () => {
    setup();
    expect(screen.getByText(siteSettings.siteName)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    setup();
    siteSettings.links.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  test("applies active class to active link", () => {
    // Setup MemoryRouter with initialEntries to simulate active link
    render(
      <MemoryRouter initialEntries={[siteSettings.links[0].url]}>
        <Header />
      </MemoryRouter>
    );
    const activeLink = screen.getByText(siteSettings.links[0].label);
    expect(activeLink).toHaveClass(
      "font-sans text-md tracking-wide capitalize text-gray-600 p-3 -m-3"
    );
  });

  test("does not apply active class to inactive links", () => {
    // Setup MemoryRouter with initialEntries to simulate no active link
    render(
      <MemoryRouter initialEntries={["/non-existing-path"]}>
        <Header />
      </MemoryRouter>
    );
    siteSettings.links.forEach((link) => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement).not.toHaveClass("font-bold");
    });
  });
});
