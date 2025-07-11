import { useNavigate } from "react-router-dom"
import { BackButton } from "../components/BackButton"
import { CustomButton } from "../components/CustomButton"
import { useState } from "react"
import axios from "axios"
import { Spinner } from "../components/Spinner"

export const CreateBlog = () => {
    const navigate = useNavigate()
    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")
    const [sentReq , setSentReq] = useState(false)

    async function handleClick(){
        setSentReq(true)
        const token = localStorage.getItem('token')
        if(!token){
            navigate("/signin")
        }else{
            try{
                await axios.post("https://backend.shubhamthesingh21.workers.dev/api/v1/blog",
                    {
                        title,
                        content
                    },
                    {
                        headers : {
                            'authorization' : `Bearer ${token}`
                        }
                    }
                )
                setSentReq(false)
                navigate("/blogs")
            }catch(err){

            }
        }   
    }
    
    return(
        <div className="w-screen h-screen grid grid-cols-5 overflow-y-auto">
            <div className="col-start-1 mt-20 flex justify-start pl-10">
                <BackButton className="hover:cursor-pointer fixed" onclick={()=>{navigate(-1)}}/>
            </div>
            <div className="col-start-2 col-span-3 grid grid-rows-7 font-poppins mt-30 mb-10">
                    <textarea 
                        className="bg-amber-50 border text-black rounded-lg w-full p-2 m-2 outline-none" 
                        placeholder="Title..."
                        onChange={(e)=>{setTitle(e.target.value)}}>
                    </textarea>
                    <textarea 
                        className="row-span-6 bg-amber-50 border text-black rounded-lg w-full p-2 m-2 outline-none" 
                        placeholder="Content..."
                        onChange={(e)=>{setContent(e.target.value)}}>   
                    </textarea>
            </div>
            <div className="col-start-5 mt-20 flex justify-end pr-10">
                <CustomButton label={sentReq ? <Spinner color="fill-green-500"/> : "Create"} onclick={handleClick} className="bg-green-500 text-white rounded-2xl fixed"/>
            </div>
        </div>
    )
}