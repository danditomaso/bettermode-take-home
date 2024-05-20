import {
  createCustomClient,
  createUseQueryHook,
  createUseMutationHook,
} from "./urql";
import { getUrqlExchanges } from "./exchanges";

const url = "https://api.bettermode.com";
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imdwd052bTcwVFUiLCJuZXR3b3JrSWQiOiJQTHhYeElwYnVRIiwibmV0d29ya0RvbWFpbiI6InBvZGRlcnMtM3Z6M3p3YTYuYmV0dGVybW9kZS5pbyIsInRva2VuVHlwZSI6IlVTRVIiLCJlbnRpdHlJZCI6bnVsbCwicGVybWlzc2lvbkNvbnRleHQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJzZXNzaW9uSWQiOiIwN2dpOTd4ZmxuZk4yZzlkSjVvbWJTNU9iZ0hCdGdPY3M5djdocWdpSVZiY1Z0c21mQyIsImlhdCI6MTcxNTYzMDEyOSwiZXhwIjoxNzE4MjIyMTI5fQ.5TrscJFjLYH6KZIXbcVNjcO0f4ABZWBu8LgU2wJHkOQ";
const client = createCustomClient({
  url,
  apiToken,
  exchanges: getUrqlExchanges,
});
const useQuery = createUseQueryHook();
const useMutation = createUseMutationHook();

export { client, useQuery, useMutation };
