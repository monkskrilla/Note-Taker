'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AddNoteForm() {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const newNote = { id: Date.now(), content, createdAt: new Date().toISOString() };
        localStorage.setItem('notes', JSON.stringify([newNote, ...notes]));
        setContent('');
        toast({
          title: 'Note added',
          description: 'Your note has been successfully added.',
        });
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error parsing notes:', error);
        toast({
          title: 'Error',
          description: 'There was an error adding your note. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[150px]"
      />
      <Button type="submit">Add Note</Button>
    </form>
  );
}