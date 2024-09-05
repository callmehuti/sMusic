import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrending } from "../api/apis";

function Search() {

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrending(),
    staleTime: 60 * 1000,
    gcTime: 120 * 1000,
    retry: 3
  });

  useMutation

  console.log(data);
  return <div>Search</div>;
}

export default Search;
