interface buttonProps {
  onclick: ()=>void,
  children: string
}
export function Button({onclick, children}: buttonProps) {
  return (
    <button
      onClick={onclick}
      className="
        bg-blue-800 text-white 
        hover:bg-blue-700 active:bg-blue-900 active:shadow-gray-300
        duration-300  rounded     active:shadow-md
        px-2 py-1 w-24"
    >{children}</button>
  )
}