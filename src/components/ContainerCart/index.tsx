import { useContext, useEffect} from "react";
import { taskContext } from "../../contexts/task";
import { Cart } from "../Cart";

export function ContainerCart() {
    const {tasks,getTasks} = useContext(taskContext);

    useEffect(getTasks, [])

    return ( 
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3  max-w-screen-xl lg:mx-auto lg:my-0">
            {tasks.map(task => <Cart key={task.id} task={task} />)}
        </div>
     );
}
