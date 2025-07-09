import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"
import { BackButton } from "../components/BackButton";

type Blog = {
  id: string,
  title: string,
  content: string
}

export const Blog = () => {

    const navigate = useNavigate()
    const {id} = useParams<{id : string}>()
    const [blog, setBlog] = useState<Blog|null>()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            navigate("/signin")
        }else{
            const fetchBlog = async () => {
            const res = await axios.get(`https://backend.shubhamthesingh21.workers.dev/api/v1/blog/${id}`,
                {
                    headers : {
                        'authorization' : `Bearer ${token}`
                    }
                }
            );
            // console.log(res.data)
            // console.log(id)
            setBlog(res.data.blog)
            };
            fetchBlog()
        }  
    }, [id])

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="w-screen h-screen grid grid-cols-5">
            <div className="col-start-1 mt-20 flex justify-start pl-10">
                <BackButton className="hover:cursor-pointer fixed" onclick={()=>{navigate(-1)}}/>
            </div>
            <div className="w-full col-start-2 col-span-3 mt-30">
                <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                <p>{blog.content}</p>
            </div>
        </div>
    );
}