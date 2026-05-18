import axios from "axios";
import type { NewNote, Note } from "../types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
api.defaults.headers.common.Authorization = `Bearer ${token}`;

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

// Fetch all notes
export const fetchNotes = async (
  query: string,
  page: number,
): Promise<ApiResponse> => {
  try {
    const { data } = await api.get<ApiResponse>("/notes", {
      params: {
        search: query,
        page,
      },
    });

    return data;
  } catch (error) {
    throw new Error("Something went wrong by fetching notes!", {
      cause: error,
    });
  }
};

// Create new note
export const createNote = async (data: NewNote): Promise<Note> => {
  try {
    const res = await api.post<Note>("/notes", data);
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong by creating new note!", {
      cause: error,
    });
  }
};

// Fetch note by id
export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = api.get<Note>(`/notes/${id}`);
    return (await res).data;
  } catch (error) {
    throw new Error("Something went wrong by fetching note!", {
      cause: error,
    });
  }
};

// Delete note by id
export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong by deleting note!", {
      cause: error,
    });
  }
};
