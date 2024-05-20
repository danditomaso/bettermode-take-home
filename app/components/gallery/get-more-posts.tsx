import Arrow from "../icons/arrow";
import { Text } from "..";
import type { ElementComponentProps } from "~/types";

type GetMorePostsProps = ElementComponentProps<"label"> & {
  onClick: () => void;
  text: string;
};

function GetMorePosts({
  onClick,
  text = "Show More",
  ...props
}: GetMorePostsProps) {
  return (
    <label
      htmlFor="get-more-posts"
      className="relative w-full bg-card rounded-lg size-96 flex flex-col place-content-center place-items-center gap-4 cursor-pointer hover:bg-card_darker"
      {...props}
    >
      <button
        type="button"
        onClick={onClick}
        id="get-more-posts"
        className=" bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-full text-sm p-2.5 inline-flex items-center transition-transform duration-300 ease-in-out transform hover:scale-125"
      >
        <Arrow className="size-8  text-white" />
        <span className="sr-only">Show more</span>
      </button>
      <Text variant="p" className="font-medium text-lg">
        {text}
      </Text>
    </label>
  );
}

export default GetMorePosts;
