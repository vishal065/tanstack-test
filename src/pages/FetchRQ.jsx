import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function FetchRQ() {
  const [page, setPage] = useState(0);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["posts", page], //dependency to call queryFn
    queryFn: () => fetchPosts(page), // useeffect
    // gcTime: 20000, //garbage collection or cache for how long the cache should be store / cache time by default gcTime is 5 min
    // staleTime: 10000, // for how long the data is consider as fresh data will not hit the api if its under staleTime
    // agar staleTime h toh refetch nhi hoga for the particular time peroid
    // refetchInterval: 100, //Polling refetch data in every 100ms
    // refetchIntervalInBackground: true, //refetch  in background even if the tab is inactive or the component is not mounted
    placeholderData: keepPreviousData, //it will keep the previous data inserted of showing loading until the new data arive and take place
  });

  if (isPending) return <div>loading....</div>;
  if (isError) return <div>Error is {error?.message}</div>;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      Fetch data here
      <div className="gap-4 mx-4 space-x-4 my-2 p-2">
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
            <li key={i} className="w-80 flex flex-row mx-auto my-2 p-4 ">
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FetchRQ;
