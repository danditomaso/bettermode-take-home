import {
  type ErrorResponse,
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
import type { ReactNode } from "react";
import { getErrorMessage } from "~/lib/errors/error";

// eslint-disable-next-line no-unused-vars
type StatusHandler = (info: {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
}) => ReactNode | null;

function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <p>
      {error.status} {error.data}
    </p>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  // eslint-disable-next-line no-unused-vars
  unexpectedErrorHandler?: (error: unknown) => ReactNode | null;
}) {
  const error = useRouteError();
  const params = useParams();

  if (typeof document !== "undefined") {
    console.error(error);
  }

  return (
    <div className="container flex items-center justify-center p-20 text-lg">
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
          error,
          params,
        })
        : unexpectedErrorHandler(error)}
    </div>
  );
}

export default GeneralErrorBoundary