import { createApi } from "@reduxjs/toolkit/query/react";
import { tag_types } from "../tag_types";
import { baseQueryWithErrorHandling } from "./baseQuery";

export const baseApi = createApi({
  reducerPath: "base",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: Object.values(tag_types),
  endpoints: () => ({}),
});
