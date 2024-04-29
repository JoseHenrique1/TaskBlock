import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ButtonAuth } from "../ButtonAuth";
import { ButtonMenu } from "../ButtonMenu";
import { useRef} from "react";

export function NavBar() {

  const token = Cookies.get("token");
  const navLinks = useRef<HTMLDivElement>(null);

  /* Verifa se a div tem flex depois troca pra hidden e vice versa */
  function handleMenuClick () {
    navLinks.current?.classList.replace("flex", "hidden")
    ||
    navLinks.current?.classList.replace("hidden", "flex"); 
  }

  return (
    <nav className="flex flex-col p-2 gap-2 border-b shadow-sm sm:flex-row sm:justify-between">
      <div className="flex justify-between sm:order-2">
          <ButtonMenu handleMenuClick={handleMenuClick} />
          <ButtonAuth token={token}/>
      </div>
      <div ref={navLinks} className="hidden flex-col sm:flex sm:flex-row sm:order-1 sm:gap-2">
          <Link to="/">Home</Link>
          {
            token && <>
              <Link to="/">Dasboard</Link>
              <Link to="/">Profile</Link>
            </>
          }
      </div>
    </nav>
  )
}