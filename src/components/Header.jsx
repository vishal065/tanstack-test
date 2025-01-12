import { NavLink } from "react-router";

function Header() {
  return (
    <header>
      <div>
        <NavLink to={"/"}>Tanstack</NavLink>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/rq"}>FetchRQ</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
