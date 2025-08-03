import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/tanstack";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";




export default async function NotesPage() {
    const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: ''}),
  });
  console.log(queryClient);
   
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );

}









