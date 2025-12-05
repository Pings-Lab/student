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
  dob: string ;
  created: string ;
  email: string | " ";
  mobile: string | " ";
  verified: boolean;
  loading: boolean;
  error: string | null;
  

  fetchProfile: () => Promise<void>;
  changeUsername: () => Promise<string>;
  changeProfile: () => Promise<string>;
  setUsername: (v: string) => void;
  setGender: (v: string) => void;
  setPin: (v: string) => void;
  setMobile: (v: string) => void;
  setEdu: (v: string) => void;
  setDob: (v: string) => void;
  setVerified: (v: boolean) => void;
  setError: (v: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  f_name: "",
  l_name: "",
  username: "",
  gender: "",
  country: "",
  pin: "",
  edu: "",
  dob: "",
  mobile: "",
  email: "",
  created: "2001-01-01",
  verified: false,
  

  loading: false,
  error: null,
  setUsername: (v) => set({ username: v }),
  setVerified: (v) => set({ verified: v }),
  setGender: (v) => set({ gender: v }),
  setPin: (v) => set({ pin: v }),
  setMobile: (v) => set({ mobile: v }),
  setEdu: (v) => set({ edu: v }),
  setDob: (v) => set({ dob: v }),
  setError: (v) => set({ error: v }),
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
  },

  changeUsername: async () => {
        const {username} = get();
        try {
          
          const res = await apiStack.c_username({ username });
          return res.data.msg;
        } catch (err: any) {
          set({
            
            error: err.response?.data?.msg || "something went wrong",
            
          });
          return err.response?.data?.msg;
        }
      },
      changeProfile: async () => {
        const {mobile, pin, edu, dob, gender} = get();
        
        try {
          
          const res = await apiStack.c_profile({ mobile, gender, pin, edu, dob });
          return res.data.msg;
        } catch (err: any) {
          set({
           
            error: err.response?.data?.msg || "something went wrong",
          });
          return err.response?.data?.msg;
        }
      }

}));
