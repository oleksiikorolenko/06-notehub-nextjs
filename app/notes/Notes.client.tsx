'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";

export const NotesClient = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 300);
    const queryClient = useQueryClient();
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['notes', debouncedSearch],
        queryFn: () => fetchNotes({search: debouncedSearch}),
    });

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
    });

    if(isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Something went wrong: {error.message}</p>;
    if (!data) return <p>No notes found.</p>;

    return (
        <>
            <SearchBox value={search} onChange={() => setSearch(debouncedSearch)} />
            <NoteList notes={data.data} />

        </>
        
    );
};

export default NotesClient;


