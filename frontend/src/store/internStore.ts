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

interface InternshipStore {
  internships: Internship[];
  loading: boolean;
  error: string | null;

  fetchInternships: () => Promise<void>;
  filterByCategory: (cat: number) => Internship[];
}

export const useInternshipStore = create<InternshipStore>((set, get) => ({
  internships: [],
  loading: false,
  error: null,

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

  filterByCategory: (cat) => {
    return get().internships.filter((item) => item.cat === cat);
  },
}));
