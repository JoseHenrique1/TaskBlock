import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";

export function CreateTask() {
    const navigate = useNavigate();
    function handleSubmit (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("ok submit");
        navigate("/dashboard");
    }

    return ( 
        <main className="flex-grow flex justify-center px-2 my-2">
            <form className="flex flex-grow max-w-screen-xl flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                    <div className="flex gap-2 self-end">
                        <Button title="Save" type="submit" icon="save" className="p-1"/>
                        <Button title="Reset all changes" type="reset" icon="reset" className="p-1"/>
                        <Button title="Change color" icon="pallete" className="p-1"/>
                        <Button title="Favorite" icon="star" className="p-1"/>
                    </div>

                    <FormField 
                        type="text" 
                        className="flex-grow py-0"
                        placeholder="Title" />
                </div>
                <textarea
                    className=" flex-grow border rounded resize-none p-2"  
                    placeholder="Description"/>
            </form>
        </main>
     );
}
