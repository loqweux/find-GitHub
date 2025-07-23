import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RepoListResponse } from "../types";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (build) => ({
    searchRepos: build.query<
      RepoListResponse,
      {
        q: string;
        page: number;
        per_page: number;
        sort: "stars" | "forks" | "updated";
        order: "asc" | "desc";
      }
    >({
      query: ({ q, page, per_page, sort, order }) =>
        `search/repositories?q=${encodeURIComponent(
          q
        )}&page=${page}&per_page=${per_page}&sort=${sort}&order=${order}`,
    }),
  }),
});

export const { useSearchReposQuery } = githubApi;
