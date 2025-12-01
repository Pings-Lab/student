import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  register: (data) => axiosClient.post("/signup", data),
  userProfile : () => axiosClient.get("/profile/info"),
  getOtp : () => axiosClient.get("/profile/verify"),
  sendOtp : (data) => axiosClient.post("/profile/verify", data),
};

export default apiStack;
