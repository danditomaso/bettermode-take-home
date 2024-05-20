import type {
  AnyVariables,
  DocumentInput,
  UseQueryArgs,
  UseQueryResponse,
  UseMutationResponse,
  Exchange,
} from "urql";
import {
  Provider as UrqlProvider,
  createClient,
  cacheExchange,
  fetchExchange,
  useQuery as useUrqlQuery,
  useMutation as useUrqlMutation,
} from "urql";

function createCustomClient({
  url,
  apiToken,
  exchanges,
  includeCredentials,
}: {
  url: string;
  apiToken?: string;
  exchanges?: Exchange[];
  includeCredentials?: boolean;
}) {
  return createClient({
    url,
    exchanges: [
      cacheExchange,
      ...(exchanges ? exchanges : []),
      fetchExchange,
    ].filter(
      // Filter out undefined or null values
      <T>(val: T): val is NonNullable<T> => val !== null && val !== undefined
    ),
    fetchOptions: () => ({
      headers: apiToken ? { authorization: `Bearer ${apiToken}` } : undefined,
      credentials: includeCredentials ? "include" : undefined,
    }),
  });
}

/**
 * Hooks
 */

function createUseQueryHook() {
  return function useQuery<Data, Variables extends AnyVariables>(
    options: UseQueryArgs<Variables, Data>
  ): UseQueryResponse<Data, Variables> {
    return useUrqlQuery<Data, Variables>(options);
  };
}

function createUseMutationHook() {
  return function useMutation<Data, Variables extends AnyVariables>(
    query: DocumentInput<Data, Variables>
  ): UseMutationResponse<Data, Variables> {
    return useUrqlMutation<Data, Variables>(query);
  };
}

export {
  UrqlProvider,
  createCustomClient,
  createUseQueryHook,
  createUseMutationHook,
};
