import { testIDs } from "~/tests/testIDs";
import { Button, Text } from "./";
import type { ElementComponentProps } from "~/types";
import { cn } from "~/lib/style";
import {
	useAddPostReaction,
	useRemovePostReaction,
} from "~/hooks/";
import React from "react";

type LikeButtonProps = ElementComponentProps<"button"> & {
	id: string;
	reactionsCount: number;
	isLiked: boolean;
};

// type LocalReactionState = {
// 	count: number;
// 	reacted: boolean;
// };

const LikeButton = React.memo(function LikeButton({
	reactionsCount,
	isLiked,
	id,
	className,
	...props
}: LikeButtonProps) {
	// This is temporary and a workaround to address not being able to otimistically update the cache
	// const [reaction, setReaction] = React.useState<LocalReactionState>({ count: 0, reacted: false });

	const { addReaction } = useAddPostReaction();
	const { removeReaction } = useRemovePostReaction();

	// This is temporary, we need to update the reaction count and reaction state when the props change. 
	// This is specifically to address the issue on the gallery detail page, where the reaction count and state aren't passed to the component on the first render
	// This is a workaround, optimistic updating of urql cache would allow us to remove effect
	// React.useEffect(() => {
	// 	setReaction({
	// 		count: reactionsCount,
	// 		reacted: isLiked,
	// 	});
	// }, [reactionsCount, isLiked])

	// if isLiked is true, remove the reaction, else add the reaction
	const handleReaction = React.useCallback((hasUserLiked: boolean) => {
		// setReaction({
		// 	count: hasUserLiked ? reaction.count + 1 : reaction.count - 1,
		// 	reacted: !reaction.reacted,
		// });

		return hasUserLiked
			? addReaction({
				input: {
					participantId: import.meta.env.VITE_PARTICIPANT_ID,
					reaction: "upvote",
				},
				postId: id,
			}) : removeReaction({
				postId: id,
				reaction: "upvote",
				participantId: import.meta.env.VITE_PARTICIPANT_ID,
			})
			;
	}, [addReaction, removeReaction, id])


	return (
		<Button
			{...props}
			type={"button"}
			size={"base"}
			className={cn(className, "flex items-center space-x-1")}
			onClick={() => handleReaction(!isLiked)}
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
}, (prevProps, nextProps) => prevProps.isLiked === nextProps.isLiked && prevProps.reactionsCount === nextProps.reactionsCount);

export default LikeButton;
