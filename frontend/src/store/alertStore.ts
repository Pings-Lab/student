import { create } from "zustand";
import apiStack from "../api/apiStack";

export interface alerts{
id: string ,
message: string,
read: boolean,
date: Date,

}

interface alertState {
  alerts: alerts[];
  got: boolean | false;
  error: string | null;
  newcount: number;

  fetchAlerts: () => Promise<void>;
  markAlert: (x: string) => Promise<boolean>;
}


export const useAlertStore = create<alertState>((set, get) => ({
  got: false,
  error: "",
  alerts: [],
  newcount: 0,

  fetchAlerts: async () => {
    try {
      set({ error: null, newcount: 0 });

      const res = await apiStack.seeAlerts(); // GET /internships

      set({
        alerts: res.data.data,   // expect backend sends array
        newcount: res.data.new,
        got: true,
      });
    } catch (err: any) {
      set({
        got: false,
        error: err.response?.data?.msg || "Failed to load notifications",
      });
    }
  },
  markAlert: async (x: string) => {
    const load={"id": x};
    try {
      set({ error: null });

      const res = await apiStack.markAlert(load); // GET /internships

      return true;
    } catch (err: any) {
      return false;
    }
  }
}));