import { create } from "zustand";
import apiStack from "../api/apiStack";

export interface Internship {
  id: string;
  name: string;
  type: string;
  cat: number;
  dur: number;
  cost: number;
  view: string;
}


export interface appliedInternship {
  id: string;
  paid: boolean;
  progress: number;
  finished: boolean;
  opted: Date;
  status: string;
  
}

interface InternshipStore {
  internships: Internship[];
  myintern: appliedInternship[];
  loading: boolean;
  applyid: string;
  error: string | null;
  error2: string | null;
  error3: string | null;

  fetchInternships: () => Promise<void>;
  myInternships: () => Promise<boolean>;
  applyInternship: (x: string) => Promise<boolean>;
  filterByCategory: (id: string) => Internship[];
  setApplyid: (id: string) => void;
}

export const useInternshipStore = create<InternshipStore>((set, get) => ({
  internships: [],
  myintern:[],
  loading: false,
  applyid: "",
  error: null,
  error2: null,
  error3: null,
  setApplyid: (v) => set({ applyid: v }),
  fetchInternships: async () => {
    try {
      set({ loading: true, error: null });

      const res = await apiStack.getInternships(); // GET /internships

      set({
        internships: res.data.data,   // expect backend sends array
        loading: false,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.msg || "Failed to load internships",
      });
    }
  },
  myInternships: async () => {
      try {
      set({  error2: null });

      const res = await apiStack.myInternships(); // GET /internships

      set({
        myintern: res.data.data,   // expect backend sends array
      
      });
      return true;
    } catch (err: any) {
      set({
        error2: err.response?.data?.msg || "Failed to load internships",
      });
      
      return false;
    }
  },
  applyInternship: async (x: string) => {
      try {
      set({  error3: null });
      const data={"domain": x}
      const res = await apiStack.applyInternship(data); 
    

      set({
        applyid: ""  
      
      });
      return true;
    } catch (err: any) {
      set({
        error3: err.response?.data?.msg || "Failed to load internships",
      });
      
      return false;
    }
  },
  filterByCategory: (id: string) => {
  return get().internships.filter((item) => item.id === id);
},
}));
