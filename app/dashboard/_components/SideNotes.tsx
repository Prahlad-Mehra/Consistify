'use client';

import useTodoStore from '../../../store/useTodoStore'; // adjust import path
import { memo , useMemo} from 'react';
import SideItems from './SideItems';
import {ScrollText} from 'lucide-react';

const NoteButton = memo(({ noteTitle }: { noteTitle: string }) => {
  // This selector will only trigger re-render when THIS specific note's name changes
  const noteName = useTodoStore(state => 
    state.notes.find(note => note.title === noteTitle)?.title || ''
  );
  const noteID= useTodoStore(state => 
    state.notes.find(note => note.title === noteTitle)?.id
  );
  if(!noteID){
    return <>
      <h1>Error while getting the noteID! Please refresh. if refresh does not solve the issue please give a feedback at the contact handles provided</h1>
    </>
  }
  return (
    <>
        <SideItems
            icon={ScrollText} // Replace with an actual icon if needed
            label={noteName}
            noteId={noteID}
            href={`/dashboard/${noteTitle}`}
            del={true} // Adjust the route as necessary
        />
    </>
  );
});

export default function SideNotes() {
  // Use shallow comparison to avoid infinite re-renders
  const notes = useTodoStore(state => state.notes);

  // Memoize noteIds so the array reference only changes when notes change
  const noteTitles = useMemo(
    () => notes.filter(note => note.title !== 'Inbox').map(note => note.title),
    [notes]
  );

  return (
    <div className="flex flex-col">
      {noteTitles.map(noteTitle => (
        <NoteButton key={noteTitle} noteTitle={noteTitle} />
      ))}
    </div>
  );
}
