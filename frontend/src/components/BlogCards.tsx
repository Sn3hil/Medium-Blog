import { Link, useNavigate } from "react-router-dom"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"
import { useContext } from "react"
import blogContext from "../context/blogContext"
import axios from "axios"
import toast from "react-hot-toast"

type BlogInput = {
    title : string,
    content : string,
    id : string,
    name? : string | null,
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

export const MyBlogCards = ({title , content , id , className}:BlogInput) => {

    const navigate = useNavigate()
    const {setThisBlog} = useContext(blogContext)
    const notify = () => toast.error("Failed")

    function handleClick(){
        setThisBlog({id,title,content})
        navigate('/blogs/editposts')
    }

    async function deleteBlog(){
        const token = localStorage.getItem('token')
        try{
            await axios.delete("https://backend.shubhamthesingh21.workers.dev/api/v1/blog",{
                data : {id},
                headers : {
                    'authorization' : `Bearer ${token}`
                }
            })
            navigate("/blogs/myposts")
            window.location.reload();
        }catch(err){
            notify()
            console.log(err)
        }
    }

    return(
            <div className={`w-full h-40 ${className} font-poppins flex justify-between p-4 m-5  shadow-md rounded-lg`}>
                <div>
                    <div className="m-2 text-3xl font-bold">
                        {title}
                    </div>
                    <div className="m-2">
                        {(content.length > 100) ? (content.slice(0,150)+"...") : content}
                    </div>
                </div>
                <div className="flex justify-around w-20">
                    <EditButton onclick={handleClick}/>
                    <DeleteButton onclick={deleteBlog}/>
                </div>
            </div>
    )
}