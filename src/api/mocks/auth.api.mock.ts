import axios from "axios";
import { AuthData, LoginResponse } from "@app/api/auth.api";

const login = async (data: AuthData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "https://eabir-backend.onrender.com/api/v1/login",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};
