import NoteList from '@/components/NoteList';
import AddNoteForm from '@/components/AddNoteForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Note-taking App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Note</h2>
          <AddNoteForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
          <NoteList />
        </div>
      </div>
    </div>
  );
}