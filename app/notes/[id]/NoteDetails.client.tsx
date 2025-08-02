'use client';

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const noteId = Number(id);

    const { data: note, isLoading, isError, } = useQuery({
        queryKey: ['note', noteId],
        queryFn: fetchNoteById(noteId),
        enabled: !isNaN(noteId),
    });

    console.log(note);

    if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

    return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Created: {note.createdAt}</p>

        </div>
    );
}