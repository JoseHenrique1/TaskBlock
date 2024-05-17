import { Button } from "../Button";
interface modalProps {
    title: string,
    closeDialog: ()=>void,
    handleDeleteTask: ()=>void,
    dialog:  React.RefObject<HTMLDialogElement>
}
function Modal({title, closeDialog, handleDeleteTask, dialog}: modalProps) {
    return (
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
    );
}

export default Modal;