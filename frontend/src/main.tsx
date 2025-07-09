import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes , Route , BrowserRouter } from 'react-router-dom'
import { SignupPage } from './pages/SingupPage.tsx'
import { SigninPage } from './pages/SigninPage.tsx'
import { BlogPage } from './pages/BlogPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { BlogPageLayout, HomeLayout, Layout } from './pages/Layout.tsx'
import { Blog } from './pages/Blog.tsx'
import { CreateBlog } from './pages/CreateBlog.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path='/' element={<HomePage/>}/>
            </Route>
            <Route element={<Layout/>}>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/signin' element={<SigninPage/>}/>
            </Route>
            <Route element={<BlogPageLayout/>}>
                <Route path='/blogs' element={<BlogPage/>}/>
                <Route path='/blogs/:id' element={<Blog/>}/>
                <Route path='/blogs/create' element={<CreateBlog/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
