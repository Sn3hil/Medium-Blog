import { CustomInput } from "./CustomInput"
import { CustomButton } from "./CustomButton"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Spinner } from "./Spinner"
import toast, { Toaster } from 'react-hot-toast';

export const SignIn = () => {
    const navigate = useNavigate()
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [sentReq ,setSentReq] = useState(false)
    const notify = () => toast.error('Maybe !! Go a little slower next time 😩');
    async function handleClick() : Promise<void> {
        try{
            setSentReq(true)
            const res = await axios.post("https://backend.shubhamthesingh21.workers.dev/api/v1/user/signin",
                {
                    email,
                    password
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
                <div className="font-bold text-4xl">SignIn</div>
                <div>
                    <CustomInput disabled = {sentReq ? true : false} tag="Email" type="text" onchange={(e)=>{setEmail(e.target.value)}}/>
                    <CustomInput disabled = {sentReq ? true : false} tag="Password" type="password" onchange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="flex flex-col items-center">
                    <CustomButton label = {sentReq ? <Spinner color="fill-black"/> : "SignIn"} onclick={handleClick} className="bg-gray-300 text-black m-2 rounded-lg"/>
                    <div className="">Do not have any account? <Link to="/signup"><span className="underline">SignUp</span></Link></div>
                </div>
            </div>
        </div>
    )
}
