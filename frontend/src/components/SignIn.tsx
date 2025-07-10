import { CustomInput } from "./CustomInput"
import { CustomButton } from "./CustomButton"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const SignIn = () => {
    const navigate = useNavigate()
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')

    async function handleClick() : Promise<void> {
        try{
            const res = await axios.post("https://backend.shubhamthesingh21.workers.dev/api/v1/user/signin",
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
        <div className="w-full h-full flex justify-center items-center text-white">
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
                <div className="font-bold text-4xl">SignIn</div>
                <div>
                    <CustomInput tag="Email" type="text" onchange={(e)=>{setEmail(e.target.value)}}/>
                    <CustomInput tag="Password" type="password" onchange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="flex flex-col items-center">
                    <CustomButton label="SignIn" onclick={handleClick} className="bg-gray-300 text-black m-2 rounded-lg"/>
                    <div className="">Do not have any account? <Link to="/signup"><span className="underline">SignUp</span></Link></div>
                </div>
            </div>
        </div>
    )
}
