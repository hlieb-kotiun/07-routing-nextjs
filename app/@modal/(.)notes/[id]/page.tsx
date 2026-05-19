import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
};
export default NotePreview;
