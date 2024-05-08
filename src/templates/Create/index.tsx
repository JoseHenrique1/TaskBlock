import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { ColorDropdown } from "../../components/ColorDropdown";


const API = import.meta.env.VITE_API;

export function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [color, setColor] = useState("blue");
    const navigate = useNavigate();

    useEffect(()=>{
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }
    }, []);

    function handleSubmit (e:React.FormEvent<HTMLFormElement>) {
        const token = Cookies.get("token")
        e.preventDefault();
        fetch(API+"tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "token": token!
            },
            body: JSON.stringify({
                title,
                description,
                isFavorite: favorite,
                colorBackground: color
            })
        });
        navigate("/dashboard", {replace: true});
    }

    return ( 
        <main className="flex-grow flex justify-center px-2 my-2">
            <form className="flex flex-grow max-w-screen-xl flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                    <div className="flex gap-2 self-end">
                        <Button title="Save" type="submit" icon="save" className="p-1"/>
                        <Button title="Reset all changes" type="reset" icon="reset" className="p-1"/>
                        <ColorDropdown setColor={setColor}/>
                        <Button 
                            onClick={()=>{setFavorite(prev=>!prev)}}
                            type="button"
                            title="Favorite" 
                            icon={favorite? "star_marked": "star"} 
                            className="p-1"/>
                    </div>

                    <FormField 
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        type="text" 
                        className="flex-grow py-0"
                        placeholder="Title" />
                </div>
                <textarea
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                    className=" flex-grow border rounded resize-none p-2"  
                    placeholder="Description"/>
            </form>
        </main>
     );
}
