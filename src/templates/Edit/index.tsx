import { useParams } from "react-router-dom";

export function Edit() {
    const params = useParams()
    return (
        <main>
            edit {params.id}
        </main>
    );
}