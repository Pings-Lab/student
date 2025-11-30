import { create } from "zustand";
import apiStack from "../api/apiStack";

interface ProfileState {
  f_name: string | null;
  l_name: string | null;
  username: string | null;
  gender: string | null;
  country: string | null;
  pin: string | null;
  edu: string | null;
  dob: string | null;
  verified: boolean;

  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  f_name: null,
  l_name: null,
  username: null,
  gender: null,
  country: null,
  pin: null,
  edu: null,
  dob: null,
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

        loading: false,
        error: null
      });

    } catch (err: any) {
      set({
        loading: false,
        error: "Failed to load profile"
      });
    }
  }
}));
