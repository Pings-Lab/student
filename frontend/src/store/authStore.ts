import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiStack from "../api/apiStack";

interface AuthState {
  email: string;
  password: string;
  message: string;
  loading: boolean;
  isAuthenticated: boolean;

  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  loginUser: () => Promise<void>;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      email: "",
      password: "",
      message: "",
      loading: false,
      isAuthenticated: false,

      setEmail: (v) => set({ email: v }),
      setPassword: (v) => set({ password: v }),

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