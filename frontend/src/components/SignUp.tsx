import { Link, useNavigate } from "react-router-dom"
import { CustomButton } from "./CustomButton"
import { CustomInput } from "./CustomInput"
import { Spinner } from "./Spinner"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export const SignUp = () => {
    const navigate = useNavigate()

    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [name ,setName] = useState('')
    const [sentReq , setSentReq] = useState(false)
    const notify = () => toast.error('This email already exists sybau🥀');

    async function handleClick() : Promise<void> {
        setSentReq(true)
        const username = (name=='') ? "Anonymous" : name
        try{
            const res = await axios.post("https://backend.shubhamthesingh21.workers.dev/api/v1/user/signup",
                {
                    email,
                    password,
                    name : username
                }
            )
            localStorage.setItem('token' , res.data.jwt)
            navigate("/blogs")
        }catch(err){
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                notify();
            }
            console.error(err)
        }finally{
            setSentReq(false)
        }
    }

    return(
        <div className="w-full h-full flex justify-center items-center text-white">
            <Toaster/>
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
                <div className="font-bold text-4xl">SignUp</div>
                <div>
                    <CustomInput disabled = {sentReq ? true : false} tag="Email" type="text" onchange={(e)=>{setEmail(e.target.value)}}/>
                    <CustomInput disabled = {sentReq ? true : false} tag="Password" type="password" onchange={(e)=>{setPassword(e.target.value)}}/>
                    <CustomInput disabled = {sentReq ? true : false} tag="Username" type="text" onchange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="flex flex-col items-center">
                    <CustomButton
                        label = {sentReq ? <Spinner color="fill-black"/> : "SignUp"}
                        onclick={handleClick} 
                        className="bg-gray-300 text-black m-2 rounded-lg"/>
                    <div className="">Already have an account? <Link to="/signin"><span className="underline">SignIn</span></Link></div>
                </div>
            </div>
        </div>
    )
}