import { testIDs } from "~/tests/testIDs";
import { Button, Text } from "./";
import type { ElementComponentProps } from "~/types";
import { cn } from "~/utils/style";
import {
	useAddPostReaction,
	useRemovePostReaction,
} from "~/hooks/usePostReaction";

type LikeButtonProps = ElementComponentProps<"button"> & {
	id: string;
	reactionsCount: number;
	isLiked: boolean;
};

function LikeButton({
	reactionsCount,
	isLiked,
	id,
	className,
	...props
}: LikeButtonProps) {
	const { addReaction } = useAddPostReaction();
	const { removeReaction } = useRemovePostReaction();

  // if isLiked is true, remove the reaction, else add the reaction
	function handleReaction(isLiked: boolean) {
		return isLiked
			? removeReaction({
					postId: id,
					reaction: "upvote",
					participantId: "gpwNvm70TU",
				})
			: addReaction({
					input: {
						participantId: "gpwNvm70TU",
						reaction: "upvote",
					},
					postId: id,
				});
	}

	return (
		<Button
			{...props}
			type={"button"}
			size={"base"}
			className={cn(className, "flex items-center space-x-1")}
			onClick={() => handleReaction(isLiked)}
			data-testid={testIDs.galleryCard.likeButton}
		>
			<Text
				variant="p"
				className="text-xl text-inherit"
			>
				{isLiked ? "♥" : "♡"}
			</Text>
			<Text variant="p" className="font-bold text-inherit">
				{reactionsCount?.toString()}
			</Text>
		</Button>
	);
}
export default LikeButton;
