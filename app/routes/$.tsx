import { Link, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary, Text } from '~/components/'

export async function loader() {
  throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
  // due to the loader, this component will never be rendered, but we'll return
  // the error boundary just in case.
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Text variant='h2'>We cant find this page:</Text>
              <pre className="whitespace-pre-wrap break-all text-lg">
                {location.pathname}
              </pre>
            </div>
            <Link to="/" className="text-lg underline">
              <Text variant="p">Back to home</Text>
            </Link>
          </div>
        ),
      }}
    />
  )
}
