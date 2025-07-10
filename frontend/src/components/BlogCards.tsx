import { Link } from "react-router-dom"

type BlogInput = {
    title : string,
    content : string,
    id : string,
    name : string | null,
    className? : string
}


export const BlogCards = ({title , content , id , name , className}:BlogInput) => {

    return(
        <Link to={`/blogs/${id}`}>
            <div className={`w-full h-40 ${className} font-poppins flex justify-between p-4 m-5  shadow-md rounded-lg hover:cursor-pointer hover:shadow-2xl transition-all duration-150 ease-in-out`}>
                <div>
                    <div className="m-2 text-3xl font-bold">
                        {title}
                    </div>
                    <div className="m-2">
                        {(content.length > 100) ? (content.slice(0,150)+"...") : content}
                    </div>
                </div>
                <div>
                    {(name==null) ? "Anonymous" : name}
                </div>
            </div>
        </Link>
    )
}