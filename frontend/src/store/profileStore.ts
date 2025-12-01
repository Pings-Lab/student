import { create } from "zustand";
import apiStack from "../api/apiStack";

interface ProfileState {
  f_name: string | " ";
  l_name: string | " ";
  username: string | " ";
  gender: string | " ";
  country: string | " ";
  pin: string | " ";
  edu: string | " ";
  dob: Date ;
  created: Date ;
  email: String | " ";
  mobile: String | " ";
  verified: boolean;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  setVerified: (v: boolean) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  f_name: "",
  l_name: "",
  username: "",
  gender: "",
  country: "",
  pin: "",
  edu: "",
  dob: "2001-01-01",
  mobile: "",
  email: "",
  created: "2001-01-01",
  verified: false,

  loading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });

      const res = await apiStack.userProfile();
      const data = res.data.data;

      set({
        f_name: data.f_name,
        l_name: data.l_name,
        username: data.username,
        gender: data.gender,
        country: data.country,
        pin: data.pin,
        edu: data.edu,
        dob: data.dob,
        verified: data.verified,
        mobile: data.mobile,
        email: data.email,
        created: data.created,
        loading: false,
        error: null
      });

    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.msg || err.message || "Something went wrong"
      });
    }
  }
}));
