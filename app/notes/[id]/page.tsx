import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import noteService from '@/lib/api';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import { Note } from '@/types/note';

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ['note', params.id],
    queryFn: () => noteService.fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}
