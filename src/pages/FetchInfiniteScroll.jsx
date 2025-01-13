import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function FetchInfiniteScroll() {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage);
        console.log("allPages", allPages);
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >
  //       document.documentElement.scrollHeight - 1;
  //     if (bottom && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [hasNextPage]);

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>error</div>;

  return (
    <div className="w-full h-screen">
      <h1>Infinite scroll</h1>
      {data?.pages?.map((page, index) => (
        <ul key={index} className="bg-black text-white">
          {page.map((item) => (
            <li key={item.id} className="p-4 border border-1 ">
              <p>{item.login}</p>
              <img src={item.avatar_url} width={50} height={50} />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} className="p-6 text-center">
        {isFetchingNextPage ? (
          <div>loading more...</div>
        ) : hasNextPage ? (
          <div>Scroll down to load more</div>
        ) : (
          <div>No more user</div>
        )}
      </div>
    </div>
  );
}

export default FetchInfiniteScroll;
