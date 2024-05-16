// import GetMoreCard from "./get-more-card";
import { BaseComponentProps } from "~/types";
import { ReactNode } from "react";
import { testIDs } from "~/tests/testIDs";

type GalleryProps<TItem> = BaseComponentProps & {
  // eslint-disable-next-line no-unused-vars
  renderCard: (post: TItem) => ReactNode;
  posts: TItem[];
};
function Gallery<TItem extends { id: string }>(props: GalleryProps<TItem>) {
  const { posts, renderCard } = props;

  if (posts?.length === 0) {
    return <div data-testid={testIDs.gallery.emptyState}>No posts found</div>;
  }

  return (
    <ul
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
      data-testid={testIDs.gallery.postContainer}
    >
      {posts?.map((post) => (
        <li key={post?.id}>{renderCard(post)}</li>
      ))}
      {/* <GetMoreCard /> */}
    </ul>
  );
}

export default Gallery;
