import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import {
	type Mock,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { LikeButton } from "~/components";
import { testIDs } from "~/tests/testIDs";
import {
	useAddPostReaction,
	useRemovePostReaction,
} from "~/hooks/usePostReaction";

// Mock the custom hooks
vi.mock("~/hooks/usePostReaction", () => ({
	useAddPostReaction: vi.fn(),
	useRemovePostReaction: vi.fn(),
}));

describe("LikeButton", () => {
	const mockAddReaction = vi.fn();
	const mockRemoveReaction = vi.fn();

	beforeEach(() => {
		(vi.mocked(useAddPostReaction) as Mock).mockReturnValue({
			addReaction: mockAddReaction,
		});
		(vi.mocked(useRemovePostReaction) as Mock).mockReturnValue({
			removeReaction: mockRemoveReaction,
		});
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	const setup = (props = {}) => {
		const defaultProps = {
			id: "test-post",
			reactionsCount: 5,
			isLiked: false,
			className: "",
			...props,
		};
		return render(<LikeButton {...defaultProps} />);
	};

	it("should render correctly", () => {
		setup();
		const likeButton = screen.queryByTestId(testIDs.galleryCard.likeButton);
		const likeIcon = screen.queryByText("♡");
		const reactionCount = screen.queryByText("5");

		expect(likeButton).toBeInTheDocument();
		expect(likeIcon).toBeInTheDocument();
		expect(reactionCount).toBeInTheDocument();
	});

	it("should call addReaction when the button is clicked and isLiked is false", () => {
		setup();
		const likeButton = screen.queryByTestId(testIDs.galleryCard.likeButton);
		fireEvent.click(likeButton!);

		expect(mockAddReaction).toHaveBeenCalledWith({
			input: {
				reaction: "upvote",
			},
			postId: "test-post",
		});
	});

	it("should call removeReaction when the button is clicked and isLiked is true", () => {
		setup({ isLiked: true });
		const likeButton = screen.queryByTestId(testIDs.galleryCard.likeButton);
		fireEvent.click(likeButton!);

		expect(mockRemoveReaction).toHaveBeenCalledWith({
			postId: "test-post",
			reaction: "upvote",
		});
	});
});
