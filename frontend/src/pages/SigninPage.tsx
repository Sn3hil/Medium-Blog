import "../App.css"
import { Hero } from "../components/Hero"
import { SignIn } from "../components/SignIn"

export const SigninPage = () => {
    return(
        <div className='w-screen h-screen bg-black grid grid-cols-2 font-poppins'>
      <SignIn/>
      <Hero/>
    </div>
    )
}