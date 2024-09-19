import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { decryptToken } from "../../libs/crypto";
import { setErrorInfo } from "../../redux/slices/errorSlice";
// import { systemLogout } from "../../redux/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      const decryptedToken = decryptToken(token);
      headers.set("access-token", decryptedToken);
    }

    return headers;
  },
});

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.data?.status == "fail") {
    // Set the global error in the error slice
    // console.log(result);
    api.dispatch(
      setErrorInfo({ type: "error", message: "Something went wrong" })
    );

    // Additional logic for handling specific errors (e.g., 401 Unauthorized)
    // if (result.error.status === 401) {
    //   api.dispatch(systemLogout()); // Clear tokens on unauthorized error
    // }
  }

  console.log(result);

  return result;
};
