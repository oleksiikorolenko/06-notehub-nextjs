import axios from "axios";
import type { Note} from "@/types/note";




axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

if (!myKey) {
  throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined. Please check your .env configuration.');
};


export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    page: number;
    data: Note[];
    total_pages: number;
    perPage: number;
}

interface RawFetchNotesResponse {
  notes: Note[];
  totalPages: number;
}




export const fetchNotes = async ({page = 1, perPage = 12, search = ''}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await axios.get<RawFetchNotesResponse>('/notes', {
        params: {
            page,
            perPage,
            ...(search !== '' && { search }),
        },
        });
    console.log(response);
    const raw = response.data;
    return {
    page,
    perPage,
    data: raw.notes,
    total_pages: raw.totalPages,
  };
};

export const fetchNoteById = async (id: number): Promise<Note> => {
    const response = await axios.get(`/notes/${id}`);
    console.log(response)
    return response.data;
}




export const createNote = async (note: {
    title: string;
    content: string;
    tag: string;
}): Promise<Note> => {
    const response = await axios.post<Note>('/notes', note);

    return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
};