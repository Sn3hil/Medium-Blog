import { Link } from "react-router-dom"

type BlogInput = {
    title : string,
    content : string,
    id : string,
    className? : string
}


export const BlogCards = ({title , content , id , className}:BlogInput) => {

    return(
        <Link to={`/blogs/${id}`}>
            <div className={`w-full h-40 ${className} font-poppins flex flex-col justify-center shadow-md rounded-lg hover:cursor-pointer hover:shadow-2xl transition-all duration-150 ease-in-out`}>
                <div className="m-2 text-3xl font-bold">
                    {title}
                </div>
                <div className="m-2">
                    {content}
                </div>
            </div>
        </Link>
    )
}