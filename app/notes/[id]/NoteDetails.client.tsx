'use client';

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from './NoteDetails.module.css'

export default function NoteDetailsClient() {
    const params = useParams();
    const id = Number(params?.id);

    const { data: note, isLoading, isError, } = useQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        enabled: !isNaN(id),
    });

    console.log(note);

    if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
                    <h2>{note.title}</h2>
	  </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
	</div>
</div>
    );
}