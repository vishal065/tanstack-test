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

export const DeletePost = async (id) => {
  try {
    const res = await axiosInstance.delete(`/posts/${id}`);
    return res.status === 200 ? "success" : "Failed";
  } catch (error) {
    console.error(error);
  }
};

export const UpdatePost = async (id) => {
  try {
    return axiosInstance.patch(`/posts/${id}`, {
      title: "new updated title",
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axiosInstance.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
