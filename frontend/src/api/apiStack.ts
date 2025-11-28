import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/auth/me"),
  login: (data) => axiosClient.post("/auth/login", data),
  logout: () => axiosClient.post("/auth/logout"),
};

export default apiStack;
