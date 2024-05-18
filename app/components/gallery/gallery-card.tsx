import { ReactNode } from "react";
import { testIDs } from "~/tests/testIDs";
import { Text } from "../";
import { BaseComponentProps } from "~/types";

type CardProps = BaseComponentProps & {
  title: string;
  children: ReactNode;
};

function Card({ title, children }: CardProps) {
  if (!children) return null;

  return (
    <article className="relative w-full rounded-lg bg-grey-800 h-96 grid grid-cols-6 grid-rows-6">
      <Text
        variant={"h3"}
        className="col-span-2 col-start-2 row-span-2 row-start-2 capitalize truncate"
        data-testid={testIDs.galleryCard.title}
      >
        {title}
      </Text>
      <div className="absolute inset-0 bg-black opacity-10" />
      {children}
    </article>
  );
}

export default Card;
