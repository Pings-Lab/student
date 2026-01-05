import { create } from "zustand";
import apiStack from "../api/apiStack";

export interface project {
  id: string;
  name: string;
  summary: string;
  type: string;
  concept: string;
  status: boolean;
  created: string;
  domain: string;
}

interface projectState {
  projects: project[];
  new_project: Partial<project>; // Use Partial so we don't need dummy data for ID/Created
  c_err: string | null;
  f_err: string | null;

  // Actions
  fetchProjects: () => Promise<boolean>;
  createProject: () => Promise<boolean>;
  setNewProjectState: (updates: Partial<project>) => void; // Added this!
}

const initialProjectState = {
  name: "",
  summary: "",
  type: "private",
  concept: "",
  status: true,
  domain: ""
};

export const useProjectStore = create<projectState>((set, get) => ({
  projects: [],
  new_project: initialProjectState,
  c_err: null,
  f_err: null,

  // Updates the form state as the user types
  setNewProjectState: (updates) => {
    set((state) => ({
      new_project: { ...state.new_project, ...updates }
    }));
  },

  fetchProjects: async () => {
    try {
      set({ f_err: null });
      const res = await apiStack.myProjects();
      set({ projects: res.data.data });
      return true;
    } catch (err: any) {
      set({ f_err: err.response?.data?.msg || "Failed to fetch projects" });
      return false;
    }
  },

  createProject: async () => {
    const { new_project } = get(); // Destructure correctly from the state
    try {
      set({ c_err: null });
      const res = await apiStack.createProjects(new_project);

      if (res.data.success) {
        // Reset form after successful creation
        set({ new_project: initialProjectState });
        return true;
      }
      return false;
    } catch (err: any) {
      set({ c_err: err.response?.data?.msg || "Creation failed" });
      return false;
    }
  }
}));