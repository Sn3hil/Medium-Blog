import { Link, useNavigate } from "react-router-dom"
import { CustomButton } from "./CustomButton"
import { CustomInput } from "./CustomInput"
import { useState } from "react"
import axios from "axios"

export const SignUp = () => {
    const navigate = useNavigate()

    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [name ,setName] = useState('')

    async function handleClick() : Promise<void> {
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
            console.error(err)
        }
    }

    return(
        <div className="w-full h-full flex justify-center items-center text-white">
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
                <div className="font-bold text-4xl">SignUp</div>
                <div>
                    <CustomInput tag="Email" type="text" onchange={(e)=>{setEmail(e.target.value)}}/>
                    <CustomInput tag="Password" type="password" onchange={(e)=>{setPassword(e.target.value)}}/>
                    <CustomInput tag="Username" type="text" onchange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="flex flex-col items-center">
                    <CustomButton label="SignUp" onclick={handleClick} className="bg-gray-300 text-black m-2 rounded-lg"/>
                    <div className="">Already have an account? <Link to="/signin"><span className="underline">SignIn</span></Link></div>
                </div>
            </div>
        </div>
    )
}