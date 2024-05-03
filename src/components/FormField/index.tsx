import { InputHTMLAttributes} from "react"

interface formFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export function FormField(props: formFieldProps) {
    return (
        <input 
            {...props}
            className="border rounded px-2 py-1"
            required />
    )
}