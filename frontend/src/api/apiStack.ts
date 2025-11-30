import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  register: (data) => axiosClient.post("/signup", data),
  userProfile : () => axiosClient.get("/profile/info")
};

export default apiStack;
