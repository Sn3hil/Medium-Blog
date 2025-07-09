import type { MouseEventHandler } from "react"

type props = {
    label : string,
    onclick : MouseEventHandler<HTMLDivElement>,
    className? : string 
}

export const CustomButton = ({label , onclick , className} : props ) => {
    return(
        <div  onClick={onclick} className={`hover:cursor-pointer w-25 h-10 font-poppins flex justify-center items-center ${className}`}>
            {label}
        </div>
    )
}