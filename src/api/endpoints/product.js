import { baseApi } from "../config/baseApi";
import { tag_types } from "../tag_types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (id) => ({
        url: `/api/merchant/product/${id}`,
        // headers: access_token(),
      }),
      providesTags: [tag_types.product],
    }),
  }),
});

export const { useGetProductQuery } = productApi;
