import { ButtonHTMLAttributes, ReactNode } from "react"

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string,
  children?: ReactNode
}
export function Button({icon, children, ...props}: buttonProps) {
  return (
    <button
      {...props}
      className="
        flex items-center justify-center text-lg
        bg-blue-800 text-white 
        hover:bg-blue-700 active:bg-blue-900 active:shadow-gray-300 active:shadow-md
        duration-300 rounded gap-1 px-1 w-auto">

      {icon && <img
                  className="size-5"
                  src={`/icons/${icon}.svg`} alt={`icon ${icon}`} />}
      {children}
    </button>
  )
}