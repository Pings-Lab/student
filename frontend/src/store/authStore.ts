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
  otp: String;

  setF_name: (v: string) => void;
  setL_name: (v: string) => void;
  setMobile: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  loginUser: () => Promise<void>;
  signupUser: () => Promise<void>;
  setOtp: (v: string) => void;
  logout: () => void;
  emailOtp: () => Promise<void>;
  verifyOtp: () => Promise<void>;
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
      otp: "",

      setEmail: (v) => set({ email: v }),
      setPassword: (v) => set({ password: v }),
      setL_name: (v) => set({ l_name: v }),
      setF_name: (v) => set({ f_name: v }),
      setMobile: (v) => set({ mobile: v }),
      setOtp: (v) => set({ otp: v }),

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
          set({ isAuthenticated: res.data.success });
        } catch (err) {
          set({ isAuthenticated: false });
        }
      },
      emailOtp: async () => {
        try {
          const res = await apiStack.getOtp();
          return res.data.success
        } catch (err: any) {
          set({
             message: err.response?.data?.msg || "something went wrong"
          });
         
        }
      },
      verifyOtp: async () => {
        const { otp } = get();
        
        try {
          const res = await apiStack.sendOtp({otp});
          set({
             message: "Account verified"
          });
         
         return res.data.success
          
        } catch (err: any) {
          set({
             message: err.response?.data?.msg || "something went wrong"
          });
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
     logout: async () => {
  try {
    // call backend to clear httpOnly cookie
    await apiStack.logout();

    // clear in-memory state
    set({
      isAuthenticated: false,
      email: "",
      password: "",
      message: ""
    });

    // remove persisted localStorage entry (replace 'auth-store' with your persist name)
    try { localStorage.removeItem("auth-store"); } catch(e) {}

    // optional: force checkAuth to run or navigate from component
  } catch (err) {
    // still clear local state even if backend fails
    set({
      isAuthenticated: false,
      email: "",
      password: "",
      message: ""
    });
    localStorage.removeItem("auth-store");
  }
}
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