/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentsDataProps } from "../types/CommentInterfaces";
import { IAddPost, IPost } from "../types/PostInterfaces";
import { IUser } from "../types/UserInterfaces";
import { AxiosAPI, userClient } from "./base";

//  Post Requests for client-side

export async function fetchPosts() {
  try {
    let response = await userClient.get('/api/v1/pheme/mine', { withCredentials: true });
    const posts = response.data as Array<IPost>;
    await Promise.all(posts.map(async (post) => {
      response = await userClient.get(`/api/v1/user/${post.createdBy}`);
      const createBy = response.data as IUser;
      post.avatar = createBy.avatar;
      post.username = createBy.username;
    }));

    return posts;
  } catch (err) {
    return err;
  }
}

export async function addPost(data: IAddPost) {
  return await userClient.post('/api/v1/pheme', data, {
    withCredentials: true
  });
}

export async function deletePost(id: number) {
  try {
    const response = await userClient.delete(`/api/v1/pheme/${id}`, {
      withCredentials: true
    });
    return response;
  } catch (err) {
    return new Promise((resolve, reject) => {
      Promise.reject(err);
    });
  }
}

export async function likePost(id: number) {
  try {
    await userClient.put(`/api/v1/pheme/like/${id}`, {
      withCredentials: true
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function unlikePost(id: number) {
  try {
    await userClient.put(`/api/v1/pheme/unlike/${id}`, {
      withCredentials: true
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function addComment(data: CommentsDataProps) {
  try {
    await AxiosAPI.post(`${import.meta.env.VITE_PHEME_USER_URL}comment`, data);
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
}

export async function fetchComments({
  queryKey,
}: {
  queryKey: Array<string | number>;
}) {
  try {
    const [_, id] = queryKey;
    //
    const res = await AxiosAPI.get(
      `${import.meta.env.VITE_PHEME_USER_URL}comment/${id}`
    );
    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
}
export async function deleteComment(id: number) {
  try {
    const res = await AxiosAPI.delete(
      `${import.meta.env.VITE_PHEME_USER_URL}comment/${id}/delete`,
      {}
    );
    return res;
  } catch (err) {
    return new Promise((resolve, reject) => {
      Promise.reject(err);
    });
  }
}
