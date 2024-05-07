import { InputHTMLAttributes} from "react"
import { twMerge } from "tailwind-merge"

interface formFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export function FormField({className, ...props}: formFieldProps) {
    return (
        <input 
            {...props}
            className={twMerge("border rounded px-2 py-1", className)}
            required />
    )
}