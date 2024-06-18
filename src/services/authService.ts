import { gql } from "@apollo/client";
import client from "../utils/apiClient";

interface LoginData {
  email: string;
  password: string;
}

export const LOGIN_QUERY = gql`
  query getUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;

export const login = async (data: LoginData) => {
  try {
    console.log("insdie try");
    const response = await client.query({
      query: LOGIN_QUERY,
      variables: data,
    });
    console.log(response)
    const token = response.data.getUserToken;
    // Set token in cookies
    document.cookie = `token=${token}; path=/`;
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
