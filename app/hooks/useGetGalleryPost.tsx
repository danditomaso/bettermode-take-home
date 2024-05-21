import { useQuery } from "~/lib/urql/client";
import { getPostQueryDocument } from "~/graphql/queries";
import type { GetPostQuery, GetPostVariables } from "~/graphql/queries/types";

function useGetGalleryPost(id: string) {
  const [{ data, error }] = useQuery<GetPostQuery, GetPostVariables>({
    query: getPostQueryDocument,
    variables: {
      id,
    },
    pause: !id,
  });

  if (error) console.error(error);

  return { data, error };
}

export default useGetGalleryPost;
