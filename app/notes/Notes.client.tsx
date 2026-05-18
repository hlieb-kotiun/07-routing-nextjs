"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

function NotesClient() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => {
      return fetchNotes(query, page);
    },
    placeholderData: keepPreviousData,
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSetQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const hasNotes = data && data?.notes.length > 0;
  const showPagination = data && data.totalPages > 1;
  const totalPages = data ? data.totalPages : 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSetQuery} defaultValue={query} />
        {showPagination && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        <button onClick={handleModalOpen} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {hasNotes && <NoteList notes={data?.notes} />}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
