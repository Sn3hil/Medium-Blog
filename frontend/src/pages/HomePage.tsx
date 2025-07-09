import { useNavigate } from "react-router-dom"
import { CustomButton } from "../components/CustomButton"

export const HomePage = () => {
    const navigate = useNavigate()

    function handleSignin(){
        navigate("/signin")
    }

    function handleSignup(){
        navigate("/signup")
    }

    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <CustomButton label="SignIn" onclick={handleSignin} className="bg-gray-300 text-black m-2 rounded-lg"/>
            <CustomButton label="Signup" onclick={handleSignup} className="bg-gray-300 text-black m-2 rounded-lg"/>
        </div>
    )
}