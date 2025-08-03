'use client';

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { NoteList } from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import css from "./NotesPage.module.css"
import Pagination from "@/components/Pagination/Pagination";

export const NotesClient = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSearch = useDebouncedCallback((search: string) => { setDebouncedSearch(search) }, 300);

  const handleSearchCange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

    const queryClient = useQueryClient();

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ['notes', page, debouncedSearch],
        queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
        placeholderData: keepPreviousData,
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
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchCange} />
       {data && data.total_pages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} type='button' onClick={() => setModalIsOpen(true)}>Create +</button>
      </header>
       
      {isSuccess && data?.data?.length > 0 ? (
        <NoteList notes={data.data} onDelete={(id) => deleteMutation.mutate(id)} />)
        : (
          <p>No notes found</p>
        )
      }
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
            <NoteForm onSubmit={mutation.mutate} onClose={() => setModalIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;


