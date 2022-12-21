/* eslint-disable @typescript-eslint/no-unused-vars */

import { store } from "../redux/store";
import { AxiosResponse } from "axios";
import { AuthProps, IUser } from "../types/UserInterfaces";
import { AxiosAPI, authClient, userClient } from "./base";
import { IPost } from "../types/PostInterfaces";

export const fetchUsers = async () => {
  try {
    const res: AxiosResponse = await userClient.get('/api/v1/users');
    return res;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

export const fetchFollowers = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  try {
    const [_, id] = queryKey;

    const res = await AxiosAPI.get(`${import.meta.env.VITE_API_URL}/api/v1/user/follower`,
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
    let res: AxiosResponse = await userClient.get(`/api/v1/user/${id}`);
    const user: IUser = res.data as IUser;

    res = await userClient.get(`/api/v1/user/follower/${id}`);
    user.following = res.data as number[];

    user.followers = [];

    res = await userClient.get(`/api/v1/pheme/user/${user.id}`, { withCredentials: true });
    user.posts = res.data as Array<IPost>;
    await Promise.all(user.posts.map(async (post) => {
      res = await userClient.get(`/api/v1/user/${post.createdBy}`);
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
    const res = await userClient.post(`/api/v1/user/follower/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
      alert(err);
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
    const res = await AxiosAPI.delete(
      `${import.meta.env.VITE_PHEME_USER_URL}/api/v1/user/follower/${id}`
    );

    return res.data;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
      alert(err);
    });
  }
};

export const registerUser = async (data: FormData) => {
  const response = await fetch(`${import.meta.env.VITE_PHEME_AUTH_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.get("username"),
      email: data.get("email"),
      password: data.get("password")
    })
  });

  return await response.json();
};

export const loginUser = async (data: AuthProps) => {
  const response = await fetch(`${import.meta.env.VITE_PHEME_AUTH_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });
  return await response.json();
};

export const searchUsers = async ({
  queryKey,
}: {
  queryKey: Array<string>;
}) => {
  const [_, query] = queryKey;

  try {
    const res: AxiosResponse = await userClient.get(`/api/v1/user/${query}`);
    return res;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
      console.log(err);
    });
  }
};

export const editUser = async (data: IUser) => {
  const userID = store.getState().user.currentUser.id;
  try {
    const res = await AxiosAPI.put(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/${userID}`,
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
