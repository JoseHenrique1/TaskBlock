import { useContext, useRef, useState } from "react";
import { alertContext } from "../../contexts/alert";
import { taskContext } from "../../contexts/task";
import { ColorDropdown } from "../ColorDropdown";
import { Button } from "../Button";
import { Link } from "react-router-dom";

interface taskInterface {
    id: string,
    title: string,
    description: string,
    isFavorite: boolean,
    colorBackground: string,
    userId: string
}

interface cartProps {
    task: taskInterface
}

interface colorVariantsInterface {
    [key: string]: string | undefined
}

const colorVariants: colorVariantsInterface = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
}

export function Card({ task }: cartProps) {
    const { id, title, description, isFavorite, colorBackground } = task;
    const [favorite, setFavorite] = useState(isFavorite);
    const [color, setColor] = useState(colorBackground);
    const dialog = useRef<HTMLDialogElement>(null)
    const { handleNewAlert } = useContext(alertContext);
    const { deleteTask, updateTask } = useContext(taskContext);

    function openDialog () {
        dialog.current?.showModal();
    }
    function closeDialog () {
        dialog.current?.close();
    }
    function handleDeleteTask() {
        deleteTask(id);
        handleNewAlert("Task deleted!");
    }

    function handleSetFavorite() {
        updateTask(id, title, description, !favorite, colorBackground);
        setFavorite(prev => !prev);
    }

    function handleSetColor(colorCurrent: string) {
        updateTask(id, title, description, favorite, colorCurrent);
        setColor(colorCurrent)
    }

    const pathIconFavorite = favorite ? "/icons/star_marked.svg" : "/icons/star.svg";

    return (
        <div className={`${colorVariants[color]} min-h-56 p-2`}>
            <div className="flex justify-between">
                <p>{title}</p>
                <div className="flex">
                    <img onClick={openDialog} src="/icons/trash.svg" alt="" />
                    <Link to={"/dashboard/" + id}><img src="/icons/edit.svg" alt="" /></Link>
                    <ColorDropdown setColor={handleSetColor} />
                    <img onClick={handleSetFavorite} src={pathIconFavorite} alt="" />
                </div>
            </div>
            <div>
                <p className="break-words">
                    {description}
                </p>
            </div>
            <dialog 
                ref={dialog} 
                className="backdrop:bg-black/15 bg-transparent  max-h-96  p-2"
                >
                <div className="flex flex-col gap-6 p-6 bg-white shadow-md shadow-black/50 rounded">
                    <p className="text-xl">Confirm deletion of "{title}".</p>
                    <div className="inline-flex gap-4">
                        <Button className="text-sm px-4 py-2" onClick={closeDialog}>Cancel</Button>
                        <Button className="text-sm px-4 py-2" onClick={handleDeleteTask}>Confirm</Button>
                    </div>   
                </div>
            </dialog>
            
        </div>
    );
}