import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostStore {
  sort: "published_at" | "-published_at";
  pageSize: number;
  pageNumber: number;
  setSort: (sort: "published_at" | "-published_at") => void;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      sort: "published_at",
      pageSize: 10,
      pageNumber: 1,
      setSort: (sort) => set({ sort }),
      setPageSize: (pageSize) => set({ pageSize }),
      setPageNumber: (pageNumber) => set({ pageNumber }),
    }),
    {
      name: "post-storage",
      getStorage: () => sessionStorage,
    }
  )
);
