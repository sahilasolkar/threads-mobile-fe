import { gql } from "@apollo/client";
import client from "../utils/apiClient";

interface LoginData {
  email: string;
  password: string;
}

interface Signup {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const LOGIN_QUERY = gql`
  query getUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

export const GET_CURRENT_LOGGEDIN_USER = gql`
  query GetCurrentLoggedInUser {
    getCurrentLoggedInUser {
      id
    }
  }
`;

export const getCurrentLoggedInUser = async (token: String) => {
  try {
    const response = await client.query({
      query: GET_CURRENT_LOGGEDIN_USER,
      variables: token,
    });
    return response.data.getCurrentLoggedInUser;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await client.query({
      query: LOGIN_QUERY,
      variables: data,
    });
    return response.data.getUserToken;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const signup = async (data: Signup) => {
  try {
    const response = await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: data,
    });
    return response.data.createUser;
  } catch (error: any) {
    throw new Error(error.message || "Signup failed");
  }
};
