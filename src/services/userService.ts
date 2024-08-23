import { gql } from "@apollo/client";
import client from "../utils/apiClient";
import { responsePathAsArray } from "graphql";

interface CreateComment {
  content: string;
  postId: string;
}

interface LikePost {
  postId: string;
}

interface getCommentByPostId {
  postId: string;
}

interface getAllUsers {
  limit: number;
  offset: number;
}

interface followUser {
  followeeId: string;
}

interface createPost {
  content: string;
  imageUrl: string;
}

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($followeeId: ID!) {
    unfollowUser(followeeId: $followeeId)
  }
`;
export const FOLLOW_USER = gql`
  mutation FollowUser($followeeId: ID!) {
    followUser(followeeId: $followeeId) {
      id
      follower {
        id
        firstName
      }
      followee {
        id
        firstName
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $imageUrl: String!) {
    createPost(content: $content, imageUrl: $imageUrl) {
      content
      createdAt
      id
      imageURL
      user {
        id
        firstName
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing {
    getFollowing {
      id
      firstName
    }
  }
`;

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

export const GET_LIKES_BY_POST_ID = gql`
  query getLikesByPostId($postId: String!) {
    getLikesByPostId(postId: $postId) {
      user {
        id
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      id
      post {
        id
        content
      }
      user {
        id
        firstName
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: String!) {
    unlikePost(postId: $postId)
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

export const GET_ALL_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      email
      lastName
      followers {
        id
      }
    }
  }
`;

export const GET_USER_POST = gql`
  query GetPostById {
    getPostById {
      id
      content
      imageURL
      user {
        id,
        firstName
      }
      comments {
        content
        id
        user {
          firstName
          lastName
        }
        createdAt
      }
      likes {
        id
        user {
          firstName
          lastName
          id
        }
        createdAt
      }
    }
  }
`;

export const likePostById = async (data: LikePost) => {
  try {
    const response = await client.mutate({
      mutation: LIKE_POST,
      variables: data,
    });
    return response.data.likePost;
  } catch (error: any) {
    throw new Error(error.message || "couldn't like Post");
  }
};

export const unlikePostById = async (data: LikePost) => {
  try {
    const response = await client.mutate({
      mutation: UNLIKE_POST,
      variables: data,
    });
    return response.data.unlikePost;
  } catch (error: any) {
    throw new Error(error.message || "couldn't unlike Post");
  }
};

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

export const getLikesByPostId = async (data: getCommentByPostId) => {
  try {
    const response = await client.query({
      query: GET_LIKES_BY_POST_ID,
      variables: data,
    });
    return response.data.getLikesByPostId;
  } catch (error: any) {
    throw new Error(error.message || "Couldn't fetch likes");
  }
};

export const getAllUsers = async (data: getAllUsers) => {
  try {
    const response = await client.query({
      query: GET_ALL_USERS,
      variables: data,
    });
    return response.data.getUsers;
  } catch (error: any) {
    throw new Error(error.message || "couldn't fetch users");
  }
};

export const followUser = async (data: followUser) => {
  try {
    const reponse = await client.mutate({
      mutation: FOLLOW_USER,
      variables: data,
    });
    return reponse.data.followUser;
  } catch (error: any) {
    throw new Error(error.message || "couldn't follow user");
  }
};

export const unfollowUser = async (data: followUser) => {
  try {
    const reponse = await client.mutate({
      mutation: UNFOLLOW_USER,
      variables: data,
    });
    return reponse.data.unfollowUser;
  } catch (error: any) {
    throw new Error(error.message || "couldn't follow user");
  }
};

export const getFollowing = async () => {
  try {
    const response = await client.query({
      query: GET_FOLLOWING,
    });
    return response.data.getFollowing;
  } catch (error: any) {
    throw new Error(error.message || "couldn't get following list");
  }
};

export const createNewPost = async (data: createPost) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_POST,
      variables: data,
    });
    return response.data.createPost;
  } catch (error: any) {
    throw new Error(error.message || "couldn't create new post");
  }
};

export const getUserPost = async () => {
  try {
    const response = await client.query({
      query: GET_USER_POST,
    });
    return response.data.getPostById;
  } catch (error: any) {
    throw new Error(error.message || "couldn't fetch users Posts");
  }
};
