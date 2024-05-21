import {
  createCustomClient,
  createUseQueryHook,
  createUseMutationHook,
} from "./urql";
import { getUrqlExchanges } from "./exchanges";

const url = "https://api.bettermode.com";
const apiToken = import.meta.env.VITE_ACCESS_TOKEN

const client = createCustomClient({
  url,
  apiToken,
  exchanges: getUrqlExchanges,
});
const useQuery = createUseQueryHook();
const useMutation = createUseMutationHook();

export { client, useQuery, useMutation };
