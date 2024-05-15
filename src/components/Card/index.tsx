import { useContext, useState } from "react";
import { alertContext } from "../../contexts/alert";
import { taskContext } from "../../contexts/task";
import { ColorDropdown } from "../ColorDropdown";
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
    const [color, setColor] = useState(colorBackground)
    const { handleNewAlert } = useContext(alertContext);
    const { deleteTask, updateTask } = useContext(taskContext);

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
                    <img onClick={handleDeleteTask} src="/icons/trash.svg" alt="" />
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
        </div>
    );
}