import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { ColorDropdown } from "../../components/ColorDropdown";
import { FormField } from "../../components/FormField";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { taskContext } from "../../contexts/task";


export function Edit() {
    const params = useParams();
    const {updateTask, getTask} = useContext(taskContext);

    const [id, setId] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [color, setColor] = useState("blue");
    const navigate = useNavigate();


    function handleSubmit (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateTask(id, title, description, favorite, color);
        //navigate("/dashboard", {replace: true});
    }

    function handleReset () {
        setTitle("");
        setDescription("");
        setFavorite(false);
        setColor("blue")
    }

    

    useEffect(()=>{
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }
        getTask(params.id||"")
        .then((data)=>{
            if (data) {
                const {task} = data;
                setId(task.id);
                setTitle(task.title);
                setDescription(task.description);
                setColor(task.colorBackground);
                setFavorite(task.isFavorite);
            }
        })
    }, []);

    return (
        <main className="flex-grow flex justify-center px-2 my-2">
            <form className="flex flex-grow max-w-screen-xl flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                    <div className="flex gap-2 self-end">
                        <Button title="Save" type="submit" icon="save" className="p-1"/>
                        <Button onClick={handleReset} title="Reset all changes" type="reset" icon="reset" className="p-1"/>
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