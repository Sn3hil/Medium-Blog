import { useState } from "react";
import blogContext from "./blogContext";
import type { Blog } from "./blogContext";

export const BlogContextProvider = ({children} : {children : React.ReactNode}) => {
    const [thisBlog , setThisBlog] = useState<Blog>()
    return(
        <blogContext.Provider value={{thisBlog , setThisBlog}}>
            {children}
        </blogContext.Provider>
    )
}