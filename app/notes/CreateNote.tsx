"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NOTE = { title: string; content: string };
const url = "http://127.0.0.1:8090/api/collections/notes/records";
async function putNote(note: NOTE) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(note),
  });
}
export default function CreateNote() {
  const [title, titleSet] = useState("");
  const [content, contentSet] = useState("");
  const router = useRouter();
  const createNote = async (e) => {
    e.preventDefault();
    if (!title) return;
    if (!content) return;
    await putNote({ title, content });
    titleSet("");
    contentSet("");
    router.refresh();
  };
  return (
    <div>
      <form>
        <label>Title:</label>
        <input type="text" onChange={(e) => titleSet(e.target.value)} />
        <label>Content:</label>
        <textarea onChange={(e) => contentSet(e.target.value)}></textarea>
        <button onClick={createNote}>Submit</button>
      </form>
    </div>
  );
}
