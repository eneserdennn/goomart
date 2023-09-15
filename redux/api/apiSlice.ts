import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../features/auth/authSlice";

import { RootState } from "../store"; // Make sure to import RootState from the correct location

interface RefreshResult {
  data: {
    access_token: string;
  };
}

const devServerIp = process.env.devServerIp || "https://ecomm.spookyorange.com";

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: devServerIp,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<RefreshResult> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  // @ts-ignore
  if (result.error?.status === 403) {
    const oldToken = (api.getState() as RootState).auth.token;
    const refreshResult = (await baseQuery(
      {
        url: "/user/auth/refresh-token",
        method: "POST",
        body: { oldToken },
      },
      api,
      extraOptions
    )) as RefreshResult;

    if (refreshResult?.data?.access_token) {
      api.dispatch(
        setCredentials({ access_token: refreshResult.data.access_token })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      // @ts-ignore
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],
  // @ts-ignore
  endpoints: (builder) => ({}), // You can define your endpoints here
});
