import type { ReactNode } from "react";
import { testIDs } from "~/tests/testIDs";
import { Text } from "../";
import type { BaseComponentProps } from "~/types";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

type CardProps = BaseComponentProps & {
  title: string;
  children: ReactNode;
};

function Card({ title, children }: CardProps) {
  if (!children) return null;

  return (
    <article className="relative w-full rounded-lg bg-card hover:bg-card_darker size-96 grid grid-cols-6 grid-rows-6 transition-colors">
      <Text
        variant={"h3"}
        className="col-span-2 col-start-2 row-span-2 row-start-2 capitalize truncate"
        data-testid={testIDs.galleryCard.title}
      >
        {title}
      </Text>
      {children}
    </article>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.status = 500
    error.data = "Oh no! Something went wrong!"
  }
}

export default Card;
