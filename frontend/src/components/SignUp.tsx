import { Link, useNavigate } from "react-router-dom"
import { CustomButton } from "./CustomButton"
import { CustomInput } from "./CustomInput"
import { useState } from "react"
import axios from "axios"

export const SignUp = () => {
    const navigate = useNavigate()

    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')

    async function handleClick() : Promise<void> {
        try{
            const res = await axios.post("https://backend.shubhamthesingh21.workers.dev/api/v1/user/signup",
                {
                    email,
                    password
                }
            )
            localStorage.setItem('token' , res.data.jwt)
            navigate("/blogs")
        }catch(err){
            console.error(err)
        }
    }

    return(
        <div className="w-full h-full flex flex-col justify-center items-center relative text-white">
            <div className="font-bold text-4xl absolute top-[28%]">SignUp</div>
            <div className="w-[60%] relative">
                <CustomInput tag="Email" type="text" onchange={(e)=>{setEmail(e.target.value)}}/>
                <CustomInput tag="Password" type="password" onchange={(e)=>{setPassword(e.target.value)}}/>
                <CustomButton label="SignUp" onclick={handleClick} className="bg-gray-300 text-black m-2 rounded-lg left-42 absolute"/>
                <div className="absolute -bottom-20 left-22">Already have an account? <Link to="/signin"><span className="underline">SignIn</span></Link></div>
            </div>
        </div>
    )
}