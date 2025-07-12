import { useNavigate } from "react-router-dom"

export const Navbar = ({color} : {color? : string}) => {
    const navigate = useNavigate()

    return (
        <div className="absolute top-5 left-0 h-12 w-full z-50 grid grid-cols-2 font-poppins">
            <div className="items-center pl-20 flex justify-start">
                <span onClick={()=>{navigate("/")}} className="hover:cursor-pointer text-white font-bold text-3xl tracking-wide">
                    Medium
                </span>
            </div>
            <div className={`flex items-center justify-around ${color}`}>
                <div className="hover:cursor-pointer">
                    Career
                </div>
                <div className="hover:cursor-pointer">
                    Contact
                </div>
                <div className="hover:cursor-pointer">
                    About
                </div>
            </div>
        </div>
    )
}

export const BlogPageNavbar = ({color} : {color? : string}) => {
    const navigate = useNavigate()

    return(
        <div className="absolute top-0 left-0 h-15 w-full z-50 grid grid-cols-2 font-poppins bg-black text-white">
            <div className="items-center pl-20 flex justify-start">
                <span onClick={()=>{
                    navigate("/blogs")
                    }} className="hover:cursor-pointer font-bold text-3xl tracking-wide">
                    Medium
                </span>
            </div>
            <div className={`flex items-center justify-around ${color}`}>
                <div className="hover:cursor-pointer">
                    Career
                </div>
                <div className="hover:cursor-pointer">
                    Contact
                </div>
                <div className="hover:cursor-pointer">
                    About
                </div>
                <div className="hover:cursor-pointer"
                    onClick={()=>{
                        navigate('/blogs/myposts')
                    }}>
                    My Posts
                </div>
                <div className="hover:cursor-pointer" 
                    onClick={
                        ()=>{
                            localStorage.removeItem('token')
                            navigate('/')
                        }
                    }>
                    Logout
                </div>
            </div>
        </div>
    )
}