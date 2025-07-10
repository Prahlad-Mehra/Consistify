'use client';

import useTodoStore from '../../../store/useTodoStore'; // adjust import path
import { memo , useMemo} from 'react';
import SideItems from './SideItems';
import {ScrollText} from 'lucide-react';

const NoteButton = memo(({ noteId }: { noteId: string }) => {
  // This selector will only trigger re-render when THIS specific note's name changes
  const noteName = useTodoStore(state => 
    state.notes.find(note => note.id === noteId)?.name || ''
  );

  return (
    <>
        <SideItems
            icon={ScrollText} // Replace with an actual icon if needed
            label={noteName}
            href={`/dashboard/${noteId}`}
            del={true} // Adjust the route as necessary
        />
    </>
  );
});

export default function SideNotes() {
  // Use shallow comparison to avoid infinite re-renders
  const notes = useTodoStore(state => state.notes);

  // Memoize noteIds so the array reference only changes when notes change
  const noteIds = useMemo(
    () => notes.filter(note => note.name !== 'Inbox').map(note => note.id),
    [notes]
  );

  return (
    <div className="flex flex-col">
      {noteIds.map(noteId => (
        <NoteButton key={noteId} noteId={noteId} />
      ))}
    </div>
  );
}
