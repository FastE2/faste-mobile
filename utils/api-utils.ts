import { ApiResponse } from "@/types/api-response";
import instanceAxios from "@/utils/axios";

export const handleApiResponse = <T>(res: T): ApiResponse => ({
  status: "success",
  message: "Request successful!",
  data: res,
  error: null,
  errorCode: null,
});

export const handleErrorResponse = (error: any): ApiResponse => {
  const errorMessage =
    error?.response?.data?.message || "Unknown error occurred";
  const errorCode = error?.response?.status || 500;
  return {
    status: "error",
    message: "Please try again later.",
    data: null,
    error: errorMessage,
    errorCode: errorCode,
  };
};

export const request = async <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: T
): Promise<ApiResponse> => {
  try {
    const config = {
      method,
      url,
      data,
      withCredentials: true,
    };

    const res = await instanceAxios(config);

    return handleApiResponse(res.data);
  } catch (error) {
    return handleErrorResponse(error);
  }
};
