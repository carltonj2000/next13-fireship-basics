const url = (id: string) => `http://127.0.0.1:8090/api/collections/notes/records/${id}`;
async function getNote(id: string) {
  const res = await fetch(url(id), { next: {revalidate: 10}});
  const data = await res.json();
  return data;
}
export default async function Note({params}: any) {
  const { id, title, content, created } =
    (await getNote(params.id)) || {};
  return (
    <div>
      <h1>Note - {id}</h1>
      <h2>{title}</h2>
      <h5>{content}</h5>
      <p>{created}</p>
    </div>
  );
}
