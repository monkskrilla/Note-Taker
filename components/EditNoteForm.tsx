'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

interface EditNoteFormProps {
  note: Note;
  onEditComplete: () => void;
}

export default function EditNoteForm({ note, onEditComplete }: EditNoteFormProps) {
  const [content, setContent] = useState(note.content);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const updatedNotes = notes.map((n: Note) =>
          n.id === note.id ? { ...n, content: content.trim() } : n
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        toast({
          title: 'Note updated',
          description: 'Your note has been successfully updated.',
        });
        onEditComplete();
      } catch (error) {
        console.error('Error updating note:', error);
        toast({
          title: 'Error',
          description: 'There was an error updating your note. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onEditComplete}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}