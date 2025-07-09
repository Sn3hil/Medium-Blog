import axios from "axios"
import { useEffect, useState } from "react"
import { BlogCards } from "../components/BlogCards"
import { useNavigate } from "react-router-dom"
import { CustomButton } from "../components/CustomButton"
import { BackButton } from "../components/BackButton"

type Blogtype = {
    id : string,
    title : string,
    content : string,

}

export const BlogPage = () => {

    const navigate = useNavigate()
    const [blogs , setBlogs] = useState<Blogtype[]>([])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate("/signin")
        }else{
            const fetchData = async() => {
            const res = await axios.get("https://backend.shubhamthesingh21.workers.dev/api/v1/blog/bulk",{
                headers : {
                    'authorization' : `Bearer ${token}`
                }
            })
            setBlogs(res.data.blogs)
            }

            fetchData()
        }
    },[])
    return(
        (blogs?.length > 0 || blogs!=undefined) ? (
            <div className="w-screen h-screen grid grid-cols-5 overflow-y-auto">
                <div className="col-start-1 mt-20 flex justify-start pl-10">
                    <BackButton className="hover:cursor-pointer fixed" onclick={()=>{navigate(-1)}}/>
                </div>
                <div className="col-start-2 col-span-3 grid gap-10 mt-30 mb-10">
                        {blogs.map((blog) => <BlogCards key={blog.id} title={blog.title} content={blog.content} id={blog.id}/>)}
                </div>
                <div className="col-start-5 mt-20 flex justify-end pr-10">
                    <CustomButton label="Create" onclick={()=>{navigate("/blogs/create")}} className="bg-green-500 text-white rounded-2xl fixed"/>
                </div>
            </div>
        ):(
            <div className="w-screen h-screen flex justify-center items-center">No Blog found</div>
        )   
    )
}