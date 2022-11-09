import Link from "next/link";
import CreateNote from "./CreateNote";

const url =
  "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30";
async function getNotes() {
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data?.items as any[];
}
export default async function Notes() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <CreateNote />
      {notes?.map((n) => (
        <Note key={n.id} note={n} />
      ))}
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <>
    <Link href={`/notes/${id}`}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
    </Link>
    </>
  );
}
