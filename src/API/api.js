import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (page) => {
  try {
    const res = await axiosInstance.get(`/posts?_start=${page}&_limit=3`);

    return res.status === 200 ? res?.data : [];
  } catch (error) {
    console.log("api ka error=", error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const res = await axiosInstance.get(`/posts/${id}`);
    return res.status === 200 ? res.data : null;
  } catch (error) {
    console.error(error);
  }
};
