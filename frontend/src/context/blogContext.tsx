import { createContext } from "react";

export type Blog = {
    id : string,
    title : string,
    content : string
}

export type context = {
    thisBlog : Blog|undefined,
    setThisBlog : React.Dispatch<React.SetStateAction<Blog | undefined>>;
}

const blogContext = createContext<context>({
    thisBlog : {
        id : "",
        title : "",
        content : ""
    },
    setThisBlog : ()=>{}
})

export default blogContext