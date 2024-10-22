'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import EditNoteForm from './EditNoteForm';

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(storedNotes);
      } catch (error) {
        console.error('Error parsing notes:', error);
        toast({
          title: 'Error',
          description: 'There was an error loading your notes. Please try refreshing the page.',
          variant: 'destructive',
        });
        setNotes([]);
      }
    };

    loadNotes();
    window.addEventListener('storage', loadNotes);
    return () => window.removeEventListener('storage', loadNotes);
  }, [toast]);

  const deleteNote = (id: number) => {
    try {
      const updatedNotes = notes.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      toast({
        title: 'Note deleted',
        description: 'Your note has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Error',
        description: 'There was an error deleting your note. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const startEditing = (note: Note) => {
    setEditingNote(note);
  };

  const handleEditComplete = () => {
    setEditingNote(null);
    try {
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(storedNotes);
    } catch (error) {
      console.error('Error parsing notes:', error);
      toast({
        title: 'Error',
        description: 'There was an error loading your notes. Please try refreshing the page.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <p className="text-muted-foreground">No notes yet. Start by adding a new note!</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id}>
            <CardContent className="pt-6">
              {editingNote && editingNote.id === note.id ? (
                <EditNoteForm note={editingNote} onEditComplete={handleEditComplete} />
              ) : (
                <p>{note.content}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <small className="text-muted-foreground">
                {new Date(note.createdAt).toLocaleString()}
              </small>
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => startEditing(note)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteNote(note.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}