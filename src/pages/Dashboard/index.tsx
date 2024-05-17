import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { ContainerCard } from "../../components/ContainerCard";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function Dashboard() {
    const [search, setSearch] = useState("")

    const navigate = useNavigate();

    function handleCreateTask () {
        navigate("/create")
    }

    useEffect(()=>{
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }
    })

    return ( 
        <main className="flex-grow px-2 space-y-2 mt-2">
            <div className="flex flex-col-reverse gap-2 items-center max-w-screen-xl lg:mx-auto lg:my-0 sm:flex-row sm:justify-between">
                <FormField value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search for your tasks" />
                <Button onClick={handleCreateTask} icon="plus">New task</Button>
            </div>
            <ContainerCard search={search}/>
        </main> 
    );
}
