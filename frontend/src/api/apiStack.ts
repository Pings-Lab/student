import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/auth/logout"),
  register: (data) => axiosClient.post("/signup", data),
};

export default apiStack;
