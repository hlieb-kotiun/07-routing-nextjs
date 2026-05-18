"use client";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NoteDetailsClient = () => {
  console.log(useParams());
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      return fetchNoteById(id);
    },
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  console.log(note);

  return (
    <div className={css.container}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      )}
    </div>
  );
};
export default NoteDetailsClient;
