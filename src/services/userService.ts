import { gql } from "@apollo/client";
import client from "../utils/apiClient";

interface CreateComment {
  content: string;
  postId: string;
}

interface getCommentByPostId {
  postId: string;
}

export const GET_FEED_QUERY = gql`
  query GetFeed {
    getFeed {
      content
      id
      user {
        id
        firstName
      }
      createdAt
      comments {
        id
        content
        createdAt
        user {
          id
          firstName
        }
      }
    }
  }
`;

export const GET_COMMENT_BY_POST_ID = gql`
  query GetCommentByPostId($postId: String!) {
    getCommentByPostId(postId: $postId) {
      id
      content
      user {
        id
        firstName
      }
      createdAt
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($content: String!, $postId: String!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      createdAt
      user {
        id
        firstName
      }
    }
  }
`;

export const createComment = async (data: CreateComment) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_COMMENT_MUTATION,
      variables: data,
    });
    return response.data.createComment;
  } catch (error: any) {
    throw new Error(error.message || "Could't create comment");
  }
};

export const getFeed = async () => {
  try {
    const response = await client.query({
      query: GET_FEED_QUERY,
    });
    return response.data.getFeed;
  } catch (error: any) {
    throw new Error(error.message || "Couldn't fetch any feed");
  }
};

export const getCommentByPostId = async (data: getCommentByPostId) => {
  try {
    const response = await client.query({
      query: GET_COMMENT_BY_POST_ID,
      variables: data,
    });
    return response.data.getCommentByPostId;
  } catch (error: any) {
    throw new Error(error.message || "Couldn't fetch comments");
  }
};
