/* eslint-disable @typescript-eslint/no-unused-vars */

import { store } from "../redux/store";
import { AxiosResponse } from "axios";
import { AuthProps, IUser } from "../types/UserInterfaces";
import { authAPI, baseAPI } from "./base";
import { IPost } from "../types/PostInterfaces";
import { generateRandomAvatarOptions } from "../utils/avatars";

export const fetchUsers = async () => {
  try {
    const res: AxiosResponse = await baseAPI.get("/api/v1/users");
    return res;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

export const fetchFollowings = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  try {
    const [_, id] = queryKey;

    const res = await baseAPI.get(`/api/v1/user/following/${id}`,
      { withCredentials: true });
    return res.data;
  } catch (err) { }
};

export const fetchSingleUser = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  const [_, id] = queryKey;
  try {
    let res: AxiosResponse = await baseAPI.get(`/api/v1/user/${id}`);
    const user: IUser = res.data as IUser;

    res = await baseAPI.get(`/api/v1/user/follower/${id}`);
    user.followers = res.data as number[];

    res = await baseAPI.get(`/api/v1/user/following/${id}`);
    user.following = res.data as number[];

    res = await baseAPI.get(`/api/v1/pheme/user/${user.id}`);
    user.posts = res.data as Array<IPost>;
    await Promise.all(user.posts.map(async (post) => {
      res = await baseAPI.get(`/api/v1/user/${post.createdBy}`);
      const createBy = res.data as IUser;
      post.avatar = createBy.avatar;
      post.username = createBy.username;
    }));

    return user;
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
    });
  }
};

export const followUser = async ({ queryKey }: { queryKey: Array<string> }) => {
  const [_, id] = queryKey;
  try {
    const res = await baseAPI.put(`/api/v1/user/follower/${id}`);
    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

export const unfollowUser = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  const [_, id] = queryKey;
  try {
    const res = await baseAPI.delete(
      `/api/v1/user/follower/${id}`
    );

    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

export const registerUser = async (data: AuthProps) => {
  try {
    data.avatar = `https://avataaars.io/?${new URLSearchParams(generateRandomAvatarOptions()).toString()}`;
    const response = await authAPI.post(
      "/api/v1/auth/register", data, { withCredentials: true });
    return response.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

export const loginUser = async (data: AuthProps) => {
  try {
    const response = await authAPI.post(
      "/api/v1/auth/login", data, { withCredentials: true });
    return response.data;
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
    });
  }
};

export const apiLogoutUser = async () => {
  try {
    const response = await authAPI.post(
      "/api/v1/auth/logout", {}, { withCredentials: true });
    return response.data;
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
    });
  }
};

export const searchUsers = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  const [_, query] = queryKey;

  try {
    const res: AxiosResponse = await baseAPI.get(`/api/v1/user/${query}`);
    return res;
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
      console.log(err);
    });
  }
};

export const editUser = async (data: IUser) => {
  const userID = store.getState().user.currentUser.id;
  try {
    const res = await baseAPI.put(
      `/api/v1/auth/${userID}`,
      data,
      {
        headers: {
          "Content-Type": "application/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};
