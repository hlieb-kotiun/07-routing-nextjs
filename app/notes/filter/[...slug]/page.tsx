import NoteList from "@/components/NoteList/NoteList";
import { getCategories } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesFilter({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  console.log("slug : ", slug);
  console.log("category : ", category);

  const notes = await getCategories(category);

  console.log("notes : ", notes);

  return (
    <div>
      {notes.notes.length > 0 ? (
        <NoteList notes={notes.notes} />
      ) : (
        <p>There are no Notes for this category!</p>
      )}
    </div>
  );
}
