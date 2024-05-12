import { useContext } from "react";
import { alertContext } from "../../contexts/alert";
import { taskContext } from "../../contexts/task";
import { ColorDropdown } from "../ColorDropdown";

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

export function Cart({task}: cartProps) {
    const {id,title,description, isFavorite,colorBackground} = task;
    const {handleNewAlert} = useContext(alertContext);
    const {deleteTask, updateTask} = useContext(taskContext);
    
    function handleDeleteTask() {
        deleteTask(id);
        handleNewAlert("Task deleted!");
    }

    function handleSetFavorite () {
        let isNewFavorite = !isFavorite;
        updateTask(id,title,description,isNewFavorite,colorBackground)
    }

    function handleSetColor (color: string) {
        updateTask(id,title,description,isFavorite,color);
    }

    const pathIconFavorite = isFavorite? "/icons/star_marked.svg": "/icons/star.svg";
    
    return ( 
        <div className={`${colorVariants[colorBackground]} min-h-56 p-2`}>
            <div className="flex justify-between">
                <p>{title}</p>
                <div className="flex">
                    <img onClick={handleDeleteTask} src="/icons/trash.svg" alt="" />
                    <img src="/icons/edit.svg" alt="" />
                    <ColorDropdown setColor={handleSetColor}/>
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