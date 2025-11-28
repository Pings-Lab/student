import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/auth/logout"),
};

export default apiStack;
