import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRef} from "react";
import { Button } from "../Button";

export function NavBar() {
  const navLinks = useRef<HTMLDivElement>(null);
  const navigate  = useNavigate();
  const token = Cookies.get("token");

  // faz logout ou apenas o redirecionamento para a pagina de login
  function handleAuthClick () {
    if (token) {Cookies.remove("token")}
    navigate("/login")
  }

  // Verifa se a div tem flex depois troca pra hidden e vice versa
  function handleMenuClick () {
    navLinks.current?.classList.replace("flex", "hidden")
    ||
    navLinks.current?.classList.replace("hidden", "flex"); 
  }

  const nameAuth = token? "Logout": "Enter";
  const iconAuth = token? "logout": "login"
  return (
    <nav className="flex flex-col p-2 gap-2 border-b shadow-sm sm:flex-row sm:justify-between">
      <div className="flex justify-between sm:order-2">
          <Button 
            onClick={handleMenuClick}
            icon="menu"
            className="sm:hidden bg-transparent hover:bg-blue-400 active:bg-blue-400"/>
          <Button 
            onClick={handleAuthClick} 
            icon={iconAuth}
          >{nameAuth}</Button>
      </div>
      <div ref={navLinks} className="hidden flex-col sm:flex sm:flex-row sm:order-1 sm:gap-2">
          <Link className="hover:text-blue-800" to="/">Home</Link>
          {token && <Link className="hover:text-blue-800" to="/dashboard">Dasboard</Link>}
      </div>
    </nav>
  )
}