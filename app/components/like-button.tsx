import { testIDs } from "~/tests/testIDs";
import { Button, Text } from "./";
import { ElementComponentProps } from "~/types";
import { useFetcher } from "@remix-run/react";
import { cn } from "~/utils/style";

type LikeButtonProps = ElementComponentProps<"button"> & {
  reactionCount: string;
  isLiked: boolean;
  href: string;
};

function LikeButton({
  reactionCount,
  isLiked,
  className,
  href,
  ...props
}: LikeButtonProps) {
  let fetcher = useFetcher();
  let liked = fetcher.formData?.get("liked") ?? isLiked;
  console.log("liked", liked);

  return (
    <fetcher.Form method="post" action={href}>
      <Button
        {...props}
        type={"button"}
        size={"base"}
        className={cn(className, "flex items-center space-x-1")}
        onClick={() => fetcher.submit({ liked: !liked })}
        data-testid={testIDs.galleryCard.likeButton}
      >
        <Text variant="p" className="text-xl text-inherit">
          {liked ? "♥" : "♡"}
        </Text>
        <Text variant="p" className="font-bold text-inherit">
          {reactionCount?.toString()}
        </Text>
      </Button>
    </fetcher.Form>
  );
}
export default LikeButton;
