import type { BaseComponentProps } from "~/types";
import type { ReactNode } from "react";
import { testIDs } from "~/tests/testIDs";

type GalleryProps<TItem> = BaseComponentProps & {
  // eslint-disable-next-line no-unused-vars
  renderCard: (post: TItem) => ReactNode;
  getMorePosts: ReactNode;
  posts: TItem[];
};
function GalleryList<TItem extends { id: string }>(props: GalleryProps<TItem>) {
  const { posts, renderCard } = props;

  if (posts?.length === 0) {
    return <div data-testid={testIDs.gallery.emptyState}>No posts found</div>;
  }

  return (
    <ul
      className="grid gap-3 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 "
      data-testid={testIDs.gallery.postContainer}
    >
      {posts?.map((post) => (
        <li key={post?.id}>{renderCard(post)}</li>
      ))}
      {props?.getMorePosts}
    </ul>
  );
}

export default GalleryList;
