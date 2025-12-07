import { API_ENDPOINT } from "@/configs/api";
import { ApiResponse } from "@/types/api-response";
import { LoginBodyType, RegisterBodyType } from "@/types/auth";
import {
  handleApiResponse,
  handleErrorResponse,
  request,
} from "@/utils/api-utils";
import axios from "axios";

export const loginAuth = async (data: LoginBodyType): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.LOGIN}`, data, {
      withCredentials: true,
    });
    return handleApiResponse(res.data);
  } catch (error: any) {
    return handleErrorResponse(error);
  }
};

export const registerAuth = async (data: RegisterBodyType) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.REGISTER}`, data);
    return handleApiResponse(res.data);
  } catch (error: any) {
    return handleErrorResponse(error);
  }
};

export const sendOTP = async (data: any) => {
  try {
    const res = await axios.post(`${API_ENDPOINT.AUTH.OTP}`, data);
    return handleApiResponse(res.data);
  } catch (error: any) {
    return handleErrorResponse(error);
  }
};

export const refreshToken = async (): Promise<ApiResponse> => {
  try {
    const res = await axios.post(
      `${API_ENDPOINT.AUTH.REFRESH_TOKEN}`,
      {},
      {
        withCredentials: true,
      }
    );
    return handleApiResponse(res.data);
  } catch (error: any) {
    return handleErrorResponse(error);
  }
};

export const logoutAuth = () => {
  return request("post", API_ENDPOINT.AUTH.LOGOUT);
};
