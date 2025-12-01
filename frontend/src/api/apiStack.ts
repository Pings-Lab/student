import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  register: (data) => axiosClient.post("/signup", data),
  userProfile : () => axiosClient.get("/profile/info"),
  getOtp : () => axiosClient.get("/profile/verify"),
  sendOtp : (data) => axiosClient.post("/profile/verify", data),
  c_username: (data) => axiosClient.post("/profile/username", data),
  c_profile: (data) => axiosClient.post("/profile/info", data),
};

export default apiStack;
