import { useSearchParams } from "@remix-run/react";
import { useQuery } from "~/lib/urql/client";
import { getPostsQueryDocument } from "~/graphql/queries";
import type {
  GetPostsQuery,
  GetPostsQueryVariables,
} from "~/graphql/queries/types";
import { siteSettings } from "~/config/siteSettings";
import { useCallback } from "react";

function useGalleryPagination(
  initialLimit = siteSettings.limits.galleryPageLimit,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // we are parsing the limit from the search params, if it is not present we default to the initial limit
  const currentLimit = Number.parseInt(
    searchParams.get("limit") ?? initialLimit.toString(),
  );

  // this function could also be passed in as a parameter to the hook
  const [{ data }] = useQuery<GetPostsQuery, GetPostsQueryVariables>({
    query: getPostsQueryDocument,
    variables: {
      limit: currentLimit,
      spaceIds: ["JTkErbfwxYwt"],
    },
  });

  // we are deriving the total number of posts from the data object
  const totalPosts = data?.posts?.totalCount ?? 0;
  const hasMorePosts = totalPosts > currentLimit;

  // make sure this function reference is stable
  const getMorePosts = useCallback(() => {
    // Calculate new limit ensuring it does not exceed totalPosts
    const newLimit = Math.min(currentLimit + initialLimit + 1, totalPosts);

    setSearchParams({
      limit: newLimit?.toString(),
    });
  }, [currentLimit, initialLimit, setSearchParams, totalPosts]);

  return { data, getMorePosts, currentLimit, hasMorePosts };
}

export default useGalleryPagination;
