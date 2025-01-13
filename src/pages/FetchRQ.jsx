import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DeletePost, fetchPosts, UpdatePost } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function FetchRQ() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["posts", page], //dependency to call queryFn
    queryFn: () => fetchPosts(page), // useeffect
    // gcTime: 20000, //garbage collection or cache for how lofng the cache should be store / cache time by default gcTime is 5 min
    // staleTime: 10000, // for how long the data is consider as fresh data will not hit the api if its under staleTime
    // agar staleTime h toh refetch nhi hoga for the particular time peroid
    // refetchInterval: 100, //Polling refetch data in every 100ms
    // refetchIntervalInBackground: true, //refetch  in background even if the tab is inactive or the component is not mounted
    placeholderData: keepPreviousData, //it will keep the previous data inserted of showing loading until the new data arive and take place
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => DeletePost(id),
    onSuccess: (data, id) => {
      console.log(data);

      queryClient.setQueryData(["posts", page], (prevState) => {
        return prevState?.filter((item) => item.id != id);
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: (id) => UpdatePost(id),
    onSuccess: (apiData, postId) => {
      queryClient.setQueryData(["posts", page], (prevState) => {
        return prevState?.map((currentData) => {
          return currentData.id === postId
            ? { ...currentData, title: apiData.data.title }
            : currentData;
        });
      });
    },
  });

  if (isPending) return <div>loading....</div>;
  if (isError) return <div>Error is {error?.message}</div>;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      Fetch data here
      <div className="gap-4 mx-4 space-x-4  p-2">
        <button
          disabled={page === 1}
          onClick={() => (page > 0 ? setPage((prev) => prev - 3) : null)}
        >
          prev
        </button>
        <span>{page / 3 + 1}</span>
        <button onClick={() => setPage((prev) => prev + 3)}>Next</button>
      </div>
      <ul className="h-full">
        {data?.map((item, i) => {
          const { id, title, body } = item;

          return (
            <li key={i} className="w-80 flex flex-row  mx-auto my-2 p-4 ">
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <div className="space-y-6">
                <button
                  onClick={() => deleteMutation.mutate(id)}
                  className=" w-20 h-12 rounded-lg p-2 outline-none bg-red-500 border-none"
                >
                  Delete
                </button>
                <button
                  onClick={() => updateMutation.mutate(id)}
                  className=" w-20 h-12 rounded-lg p-2 outline-none bg-green-500 border-none"
                >
                  Update
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FetchRQ;
