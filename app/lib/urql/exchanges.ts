import { type ClientOptions, fetchExchange } from "urql";
import {
  cacheExchange,
} from "@urql/exchange-graphcache";
import schema from "./schema.json";


export const getUrqlExchanges: ClientOptions["exchanges"] = [
  cacheExchange({
    schema,
    keys: {
      PaginatedPost: () => null,
      Post: () => null,
      SpaceMember: () => null,
      PostReactionDetail: () => null,
    },
  }),
  fetchExchange,
];
