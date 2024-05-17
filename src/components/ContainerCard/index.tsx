import { useContext, useEffect} from "react";
import { taskContext } from "../../contexts/task";
import { Card } from "../Card";

interface containerCardProps {
    search: string
}
export function ContainerCard({search}: containerCardProps) {
    const {tasks,getTasks} = useContext(taskContext);

    useEffect(getTasks, [])

    let taskFiltered = tasks.filter(item=>item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    return ( 
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3  max-w-screen-xl lg:mx-auto lg:my-0">
            {taskFiltered.length !== 0 ?
                taskFiltered.map(task => <Card key={task.id} task={task} />)
                :
                <p className="sm:col-span-2 md:col-span-3 lg:col-span-4">No task was found with the name "{search}"</p>
            }
        </div>
     );
}
