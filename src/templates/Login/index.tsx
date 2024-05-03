import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { PresentationAuth } from "../../components/PresentationAuth";
import { FormField } from "../../components/FormField";
import { alertContext } from "../../contexts/alert";

const API = import.meta.env.VITE_API;

interface fetchLogin {
    statusCode:number, 
    token?:string,
    user: {
      name: string
    }
}

export function Login() {
  const {handleNewAlert} = useContext(alertContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //caso o user esteja logado ele não pode acessar essa pagina
  useEffect(()=>{
    const token = Cookies.get("token");
    if (token) {
      navigate("/dashboard");
      return;
    }
  }, []);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify({
            email,
            password
        })
    };

    fetch(API+"users/login", options)
    .then(data=>data.json())
    .then((data: fetchLogin)=>{
        if (data.statusCode === 200) {
            Cookies.set("name", data.user.name, { expires: 7 });
            Cookies.set("token", data.token!, {expires: 7});
            Cookies.set("email", email, { expires: 7 });
            navigate("/");
            return;
        }
        handleNewAlert("Verify email and password")
    })
    .catch(()=>{
        handleNewAlert("Try later!");
    }) 
  }

  return (
    <main className="flex-grow flex flex-col items-center gap-4 py-4 px-2 justify-center">
      <PresentationAuth/>
      <form className="flex flex-col gap-2 w-min" onSubmit={handleLogin}>
            <FormField 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}/>
            <FormField 
                type="password" 
                placeholder="password" 
                value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}/>

            <input 
                type="submit" 
                value="Enter"/>
            <p>Don't have an account? <Link to="/registration">Register</Link></p>     
        </form>
    </main>
  )
}