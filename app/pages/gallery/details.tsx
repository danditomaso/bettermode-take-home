import { Suspense } from "react";
import { Text } from "~/components";
import { BaseComponentProps } from "~/types";

type DetailsPageProps = BaseComponentProps & {
  title: string;
  description: string;
  reactionsCount: number;
};

function DetailsPage(props: DetailsPageProps) {
  console.log(props);

  return (
    <Suspense fallback={<p>loading...</p>}>
      {/* <Await resolve={posts}>{(posts) => console.log(posts)}</Await> */}

      <div className="flex flex-col gap-12 mt-7">
        <Text variant="h2">{props.title}</Text>
        <Text variant="p" className="text-balance w-full max-w-[80ch] block">
          {props.description}
        </Text>
      </div>
    </Suspense>
  );
}

export default DetailsPage;
