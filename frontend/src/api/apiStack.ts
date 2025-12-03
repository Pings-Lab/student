import axiosClient from "./axiosClient";

const apiStack = {
  getUser: () => axiosClient.get("/state"),
  login: (data: any) => axiosClient.post("/login", data),
  logout: () => axiosClient.post("/logout"),
  register: (data: any) => axiosClient.post("/signup", data),
  userProfile : () => axiosClient.get("/profile/info"),
  getOtp : () => axiosClient.get("/profile/verify"),
  sendOtp : (data: any) => axiosClient.post("/profile/verify", data),
  c_username: (data: any) => axiosClient.post("/profile/username", data),
  c_profile: (data: any) => axiosClient.post("/profile/info", data),
  getInternships: () => axiosClient.get("/domains/list"),
  myInternships: () => axiosClient.get("/internship/list"),
  applyInternship: (data: any) => axiosClient.post("/internship/apply", data)
};

export default apiStack;
