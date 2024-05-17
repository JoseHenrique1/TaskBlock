import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { PresentationAuth } from "../../components/PresentationAuth";
import { FormField } from "../../components/FormField";
import { alertContext } from "../../contexts/alert";
import { Button } from "../../components/Button";

interface fetchRegistration {
  statusCode:number
}

const API = import.meta.env.VITE_API;

export function Registration() {
  const {handleNewAlert} = useContext(alertContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //se o usuario estiver logado ele vai ser redirecionado para deashboard
  useEffect(()=>{
    const token = Cookies.get("token");
    if (token) {
      navigate("/dashboard");
      return;
    }
  }, []);

  function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: JSON.stringify({
            name,
            email,
            password
        })
    };

    fetch(API+"users", options)
    .then(data=>data.json())
    .then((data: fetchRegistration)=>{
        if (data.statusCode === 200) {
            navigate("/login");
            return;
        }
        handleNewAlert("Verify name, email and password");
    })
    .catch(()=>{
        handleNewAlert("try later");
    }) 
  }

  return (
    <main className="flex-grow flex flex-col items-center gap-4 py-4 px-2 justify-center">
      <PresentationAuth/>
      <form className="flex flex-col gap-2 w-min" onSubmit={handleRegistration}>
            <FormField 
                type="text" 
                placeholder="name" 
                value={name} 
                onChange={(e)=>{setName(e.target.value)}}/>
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

            <Button type="submit">Register</Button>
            
            <p>Do you have an account? <Link to="/login" className="text-blue-800">Sign in</Link></p>
        </form>
    </main>
  )
}