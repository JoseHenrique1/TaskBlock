import { useContext } from "react";
import { alertContext } from "../../contexts/alert";
import { taskContext } from "../../contexts/task";

interface taskInterface {
    id: string,
    title: string,
    description?: string,
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
    const {id,title,description,isFavorite,colorBackground} = task;
    const {handleNewAlert} = useContext(alertContext);
    const {deleteTask} = useContext(taskContext);
    
    function handleDeleteTask() {
        deleteTask(id);
        handleNewAlert("Task deleted!");
    }

    const pathIconFavorite = isFavorite? "/icons/star_marked.svg": "/icons/star.svg";
    
    return ( 
        <div className={`${colorVariants[colorBackground]} min-h-56 p-2`}>
            <div className="flex justify-between">
                <p>{title}</p>
                <div className="flex">
                    <img onClick={handleDeleteTask} src="/icons/trash.svg" alt="" />
                    <img src="/icons/edit.svg" alt="" />
                    <img src="/icons/pallete.svg" alt="" />
                    <img src={pathIconFavorite} alt="" />
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