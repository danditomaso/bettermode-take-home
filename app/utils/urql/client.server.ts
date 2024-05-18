import { Client } from "@urql/core";
import { getUrqlExchanges } from "./exchanges.server";

export const createClient = ({
  graphQLEndpoint,
  accessToken,
}: {
  graphQLEndpoint: string;
  accessToken: string;
}) => {
  const client = new Client({
    url: graphQLEndpoint,
    exchanges: getUrqlExchanges,
    suspense: true,
    fetchOptions: () => ({
      headers: { authorization: accessToken ? `Bearer ${accessToken}` : "" },
    }),
  });
  return client;
};

const client = createClient({
  graphQLEndpoint: process?.env.GRAPHQL_URL ?? "",
  accessToken: process?.env.ACCESS_TOKEN ?? "",
});

export { client };
