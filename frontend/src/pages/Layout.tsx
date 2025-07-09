import { Outlet } from "react-router-dom"
import { BlogPageNavbar, Navbar } from "../components/Navbar"

export const Layout = () => {
    return(
        <>
        <Navbar color="hidden"/>
        <Outlet/>
        </>
    )
}

export const HomeLayout = () => {
    return(
        <>
            <Navbar color="text-white"/>
            <Outlet/>
        </>
    )
}

export const BlogPageLayout = () => {
    return(
        <>
            <BlogPageNavbar/>
            <Outlet/>
        </>
    )
}