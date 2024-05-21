import { testIDs } from "~/tests/testIDs";
import { Button, Text } from "./";
import type { ElementComponentProps } from "~/types";
import { cn } from "~/lib/style";
import {
	useAddPostReaction,
	useRemovePostReaction,
} from "~/hooks/";
import React from "react";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphic";

type LikeButtonProps = ElementComponentProps<"button"> & {
	id: string;
	reactionsCount: number;
	isLiked: boolean;
};

type LocalReactionState = {
	count: number;
	reacted: boolean;
};

const LikeButton = React.memo(function LikeButton({
	reactionsCount,
	isLiked,
	id,
	className,
	...props
}: LikeButtonProps) {

	// This is temporary and a workaround to address not being able to otimistically update the cache
	const [reaction, setReaction] = React.useState<LocalReactionState>({ count: reactionsCount, reacted: isLiked });

	// eslint-disable-next-line no-undef
	const { addReaction } = useAddPostReaction();
	const { removeReaction } = useRemovePostReaction();

	// This is temporary, we need to update the reaction count and reaction state when the props change. 
	// This is specifically to address the issue on the gallery detail page, where the reaction count and state aren't passed to the component on the first render
	// This is a workaround, optimistic updating of urql cache would allow us to remove effect
	useIsomorphicLayoutEffect(() => {
		// sometimes the id is not passed, so we need to check if it exists
		if (!id) return;

		setReaction({
			count: reactionsCount,
			reacted: isLiked,
		});
	}, [reactionsCount, isLiked])

	// if isLiked is true, remove the reaction, else add the reaction
	const handleReaction = React.useCallback((hasUserLiked: boolean) => {
		setReaction({
			count: hasUserLiked ? reaction.count + 1 : reaction.count - 1,
			reacted: hasUserLiked,
		});

		return reaction.reacted === false
			? addReaction({
				input: {
					reaction: "upvote",
				},
				postId: id,
			}) : removeReaction({
				postId: id,
				reaction: "upvote",
			})
			;
	}, [reaction.count, reaction.reacted, addReaction, id, removeReaction])


	return (
		<Button
			{...props}
			type={"button"}
			size={"base"}
			className={cn(className, "flex items-center space-x-1")}
			onClick={() => handleReaction(!reaction.reacted)}
			data-testid={testIDs.galleryCard.likeButton}
		>
			<Text
				variant="p"
				className="text-xl text-inherit"
			>
				{reaction.reacted ? "♥" : "♡"}
			</Text>
			<Text variant="p" className="font-bold text-inherit">
				{reaction.count?.toString()}
			</Text>
		</Button>
	);
}
	, (prevProps, nextProps) => prevProps.isLiked === nextProps.isLiked && prevProps.reactionsCount === nextProps.reactionsCount && prevProps.id !== nextProps.id);

export default LikeButton;
