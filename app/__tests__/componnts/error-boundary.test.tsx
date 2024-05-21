import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRouteError, useParams, isRouteErrorResponse } from "@remix-run/react";
import { GeneralErrorBoundary } from "~/components";
import { getErrorMessage } from "~/components/error-boundary";

// Mock the useRouteError, useParams, and isRouteErrorResponse hooks from @remix-run/react
vi.mock("@remix-run/react", () => ({
  useRouteError: vi.fn(),
  useParams: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}));

// Mock the getErrorMessage function from GeneralErrorBoundary component
vi.mock("~/components/GeneralErrorBoundary", () => ({
  ...vi.importActual("~/components/GeneralErrorBoundary"),
  getErrorMessage: vi.fn(),
}));

describe("GeneralErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the default status handler for a route error response", () => {
    const mockError = { status: 404, data: "Not Found" };
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    render(<GeneralErrorBoundary />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });

  it("should render a custom status handler if provided", () => {
    const mockError = { status: 403, data: "Forbidden" };
    const mockParams = { id: "123" };
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(useParams).mockReturnValue(mockParams);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    const customStatusHandler = ({ error }: { error: { status: number, data: string } }) => (
      <p>
        Custom handler: {error?.status} {error.data}
      </p>
    );

    render(
      <GeneralErrorBoundary
        statusHandlers={{ 403: customStatusHandler }}
      />
    );

    expect(screen.getByText("Custom handler: 403 Forbidden")).toBeInTheDocument();
  });

  it("should render the unexpected error handler for non-route error responses", () => {
    const mockError = new Error("Unexpected Error");
    const mockErrorMessage = "Unexpected Error";
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    render(<GeneralErrorBoundary />);

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it("should log the error to the console", () => {
    const mockError = new Error("Unexpected Error");
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    render(<GeneralErrorBoundary />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    consoleErrorSpy.mockRestore();
  });
});
