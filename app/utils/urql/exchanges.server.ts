import { ClientOptions, fetchExchange } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";

export const getUrqlExchanges: ClientOptions["exchanges"] = [
  devtoolsExchange,
  cacheExchange({}),
  fetchExchange,
];
