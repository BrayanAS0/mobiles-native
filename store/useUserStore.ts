import { create } from 'zustand';

type UserState = {
  username: string;
  setUsername: (name: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
}));
type UserStateId = {
  id: number;
  setUserId: (id: number) => void;
};

export const useUserStoreId = create<UserStateId>((set) => ({
  id: 0,
  setUserId: (id:number) => set(  {id:id} ),
}));
