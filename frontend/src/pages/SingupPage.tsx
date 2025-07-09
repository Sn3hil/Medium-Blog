import "../App.css"
import { Hero } from "../components/Hero"
import { SignUp } from "../components/SignUp"

export const SignupPage = () => {
    return(
        <div className='w-screen h-screen bg-black grid grid-cols-2 font-poppins'>
      <SignUp/>
      <Hero/>
    </div>
    )
}