import { useState } from "react";
import { Button } from "../Button";

interface colorDropdownProps {
    setColor: (color: string)=>void
    transparent?: boolean
}

export function ColorDropdown({setColor, transparent}: colorDropdownProps) {
    const [show, setShow] = useState(false);

    function handleShowGridColor () {
        setShow(prev=>!prev)
    }

    function handleSetColor(color: string) {
        setColor(color);
        handleShowGridColor();
    }


    return ( 
        <div className="relative">
            {transparent? <img className="cursor-pointer" onClick={handleShowGridColor} src="/icons/pallete.svg"/> :
            <Button 
                type="button"
                onClick={handleShowGridColor} 
                className="w-full h-full"
                icon="pallete"/>
            }
            
            {show &&
                <div className="absolute -left-16 bg-zinc-200 grid grid-cols-2 grid-rows-2 gap-2 p-2 w-32 h-32">
                    <button type="button" className="bg-red-600 " onClick={()=>handleSetColor("red")}/>
                    <button type="button" className="bg-blue-600 " onClick={()=>handleSetColor("blue")}/>
                    <button type="button" className="bg-green-600 " onClick={()=>handleSetColor("green")}/>
                    <button type="button" className="bg-orange-600  " onClick={()=>handleSetColor("orange")}/>
                </div>
            }
        </div>
    );
}
