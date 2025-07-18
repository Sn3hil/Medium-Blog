import type { ChangeEventHandler } from "react";


type props = {
    tag : string,
    type : string,
    onchange : ChangeEventHandler<HTMLInputElement>,
    disabled : boolean,
    className? : string
}

export const CustomInput = ({tag , type , onchange , className , disabled} : props) => {
    return(
        <div className="m-4">
            <input disabled={disabled} onChange={onchange} placeholder={tag} className={`bg-amber-50 border text-black rounded-lg h-10 w-full p-2 m-2 outline-none ${className}`} type={type}/>
        </div>
    )
}