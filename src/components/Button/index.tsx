import { ButtonHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string,
  children?: ReactNode
}
export function Button({icon, children, className, ...props}: buttonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        `flex items-center justify-center w-auto gap-1 px-1   
        bg-blue-800 text-white 
        hover:bg-blue-700 active:bg-blue-900 active:shadow-gray-300 active:shadow-md 
        duration-300 rounded text-lg`,
        className
      )}>
        
      {icon && 
      <img className="size-5" src={`/icons/${icon}.svg`} alt={`icon ${icon}`} />}
      
      {children}
    </button>
  )
}