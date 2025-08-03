import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/tanstack";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: { id: string };
};

export default async function NoteDetailsPage({ params }: Props) {
    const queryClient = getQueryClient();
    const noteId = params.id;
  
      
    await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });


    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={noteId} />
        </HydrationBoundary>
    );
}