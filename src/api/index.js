import axios from "axios";

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  },
});

export const fetchPosts = async (id) => {
  try {
    const { data } = await axiosIntance.get(`/v1/posts?page=${id}`);
    return data;
  } catch (err) {
    throw Error("Unable to fetch posts");
  }
};

export const fetchPost = async (id) => {
  try {
    const { data } = await axiosIntance.get(`/v1/posts/${id}`);
    return data;
  } catch (err) {
    throw Error("Unable to fetch posts");
  }
};

export const fetchUserPosts = async (id) => {
  try {
    console.log("fetching again fetch Posts");
    const { data } = await axiosIntance.get(`/v2/posts/550/comments`);
    return data;
  } catch (err) {
    throw Error("Unable to fetch posts");
  }
};

export const addNewPost = async (values) => {
  try {
    const { data } = await axiosIntance.post(`/v1//users/17/posts`, {
      title: values.title,
      body: values.body,
    });
    return data;
  } catch (err) {
    throw Error(err.response.statusText);
  }
};
