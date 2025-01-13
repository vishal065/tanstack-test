import { NavLink } from "react-router";

function Header() {
  return (
    <header>
      <div className=" w-full h-32 space-x-10 p-4 ">
        <div className=" flex p-2">
          <NavLink to={"/"}>Tanstack</NavLink>
        </div>
        <div>
          <ul className="flex gap-6 justify-center items-center ">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/rq"}>FetchRQ</NavLink>
            </li>
            <li>
              <NavLink to={"/infinite"}>infinite Scroll</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
