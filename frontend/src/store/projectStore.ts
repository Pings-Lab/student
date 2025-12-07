import { create } from "zustand";
import apiStack from "../api/apiStack";

export interface project{
id: string ,
name: string,
summary: string,
type: string,
concept: string,
status: boolean,
created:  string,
domain:  string,

}

interface projectState {
  projects: project[];
  new_project: project;
  c_err: string | null;
  f_err: string | null;

  fetchProjects: () => Promise<boolean>;
  createProject: () => Promise<boolean>;
}


export const useProjectStore = create<projectState>((set, get) => ({
  projects: [],
  new_project: {id: "", name: "", summary: "", type: "", concept: "", status: true, created: "", domain: ""},
  c_err: null,
  f_err: null,
  fetchProjects: async () => {
    try {

      set({
         c_err: null,
      });
      const res = await apiStack.myProjects(); // GET /internships

      set({
        projects: res.data.data, 
      });
      return true;
    } catch (err: any) {
      set({
         f_err: err.response?.data?.msg,
      });
      return false;
    }
  },
  createProject: async () => {
    const new_project = get();
    try {
      set({
         c_err: null,
      });

      const res = await apiStack.createProjects(new_project); // GET /internships

      return res.data.success;
    } catch (err: any) {
      set({
         c_err: err.response?.data?.msg,
      });
      return false;
    }
  }
}));