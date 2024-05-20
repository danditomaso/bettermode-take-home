import { useQuery } from "~/utils/urql/client";
import { getPostQueryDocument } from "~/graphql/queries";
import { GetPostQuery, GetPostVariables } from "~/graphql/queries/types";

function useGetGalleryPost(id: string) {
  const [{ data, error }] = useQuery<GetPostQuery, GetPostVariables>({
    query: getPostQueryDocument,
    variables: {
      id,
    },
  });

  if (error) console.error(error);

  return { data };
}

export default useGetGalleryPost;
