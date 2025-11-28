import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiStack from "../api/apiStack";

interface AuthState {
  f_name: string;
  l_name: string;
  mobile: string;
  email: string;
  password: string;
  message: string;
  loading: boolean;
  isAuthenticated: boolean;

  setF_name: (v: string) => void;
  setL_name: (v: string) => void;
  setMobile: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  loginUser: () => Promise<void>;
  signupUser: () => Promise<void>;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      f_name: "",
      l_name: "",
      mobile: "",
      email: "",
      password: "",
      message: "",
      loading: false,
      isAuthenticated: false,

      setEmail: (v) => set({ email: v }),
      setPassword: (v) => set({ password: v }),
      setL_name: (v) => set({ l_name: v }),
      setF_name: (v) => set({ f_name: v }),
      setMobile: (v) => set({ mobile: v }),

      loginUser: async () => {
        const { email, password } = get();
        try {
          set({ loading: true });
          const res = await apiStack.login({ email, password });

          set({
            message: res.data.message,
            loading: false,
            isAuthenticated: true,
            email: "",
            password: ""
          });
        } catch (err: any) {
          set({
            loading: false,
            message: err.response?.data?.msg || "Login failed",
            isAuthenticated: false
          });
        }
      },
       checkAuth: async () => {
        try {
          const res = await apiStack.getUser(); // IMPORTANT
          set({ isAuthenticated: true });
        } catch (err) {
          set({ isAuthenticated: false });
        }
      },
      signupUser: async () => {
        const { f_name, l_name, mobile, email, password } = get();
        try {
          set({ loading: true });
          const res = await apiStack.register({ f_name, l_name, mobile, email, password });
          set({
            message: res.data.message,
            loading: false,
            isAuthenticated: true,
            email: "",
            password: ""
          });
        } catch (err: any) {
          set({
            loading: false,
            message: err.response?.data?.msg || "Signup failed",
            isAuthenticated: false
          });
        }
      },
      logout: () =>
        set({
          isAuthenticated: false,
          email: "",
          password: "",
          message: ""
        }),
    }),
    
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        email: state.email,
        password: state.password,
      }),
    }
  )
);

export default useAuth;