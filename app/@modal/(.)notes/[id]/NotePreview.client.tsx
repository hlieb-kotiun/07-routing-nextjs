"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      return fetchNoteById("i543");
    },
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => router.back();

  if (isError) {
    return (
      <Modal onClose={handleCloseModal}>
        <div className={css.item}>
          <p>Something went wrong.</p>
          <button className={css.backBtn} onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  if (!note) return null;

  return (
    <div>
      <Modal onClose={handleCloseModal}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button className={css.backBtn} onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default NotePreview;
