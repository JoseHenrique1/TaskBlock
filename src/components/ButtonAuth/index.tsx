import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface buttonAuthProps {
  token: string | undefined
}

export function ButtonAuth({token}: buttonAuthProps) { 
  const navigate  = useNavigate();

  function handleClick () {
    if (token) {
      Cookies.remove("token")
    }
    navigate("/login")
  }

  return (
    <button
      onClick={handleClick}
    >
    {token?"Logout": "Enter"}
    </button>
  )
}