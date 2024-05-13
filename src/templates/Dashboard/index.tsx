import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { ContainerCard } from "../../components/ContainerCard";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();

    function handleCreateTask () {
        navigate("/create")
    }

    return ( 
        <main className="flex-grow px-2 space-y-2 mt-2">
            <div className="flex flex-col-reverse gap-2 items-center sm:flex-row sm:justify-between">
                <FormField type="text" placeholder="Search for your tasks" />
                <Button onClick={handleCreateTask} icon="plus">New task</Button>
            </div>
            <ContainerCard/>
        </main> 
    );
}
