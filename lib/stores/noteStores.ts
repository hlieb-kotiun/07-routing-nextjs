import { NoteDraft } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewNoteDraft {
  draft: NoteDraft;
  setDraft: (note: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNewDraftStore = create<NewNoteDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set(() => ({
          draft: note,
        })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
