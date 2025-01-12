import { NavLink, useParams } from "react-router-dom";
import { fetchPostById } from "../../API/api";
import { useQuery } from "@tanstack/react-query";

function FetchById() {
  const { id } = useParams();
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPostById(id),
  });
  if (isPending) return <div>loading....</div>;
  if (isError) return <div>Error is {error?.message}</div>;
  return (
    <div>
      <ul>
        <li>
          <p>{data?.id}</p>
          <p>{data?.title}</p>
          <p>{data?.body}</p>
        </li>
      </ul>
      <NavLink to={`/rq`}>
        <button>go back</button>
      </NavLink>
    </div>
  );
}

export default FetchById;
