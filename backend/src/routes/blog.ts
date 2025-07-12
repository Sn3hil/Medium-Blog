import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@arka07/medium-project";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
      userId : string
    }
}>()


blogRouter.use('/*' , async(c,next) => {
  try{
    const header = c.req.header("authorization") || ""
    const token = header.split(" ")[1]

    const response = await verify(token , c.env.JWT_SECRET)
    if(response){
      c.set('userId' , String(response.id))
      await next()
    }else{
      c.status(403)
      return c.json({ error : "unauthorized" })
    }
  }catch(err){
    return c.json({
      message : "Authentication Invalid"
    })
  }  
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = createBlogInput.safeParse(body)
  
  if(!success){
    return c.json({
      message : "Wrong input format"
    })
  }

  const id = c.get('userId')

  try{
    const blog = await prisma.post.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : id
      }
    })

    return c.json({
      id : blog.id
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  }
})


blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = updateBlogInput.safeParse(body)
  
  if(!success){
    return c.json({
      message : "Wrong input format"
    })
  }

  try{
    const blog = await prisma.post.update({
      where : {
        id : body.id
      },
      data : {
        title : body.title,
        content : body.content
      }
    })

    return c.json({
      id : blog.id
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  } 
})

blogRouter.delete('/' , async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try{
    const blog = await prisma.post.delete({
      where : {
        id : body.id
      }
    })
    c.status(200)
    return c.json({
      message : "deletion successful"
    })
  }catch(err){
    c.status(401)
    return c.json({
      message : "Some error occurred while deleting blog."
    })
  } 
})


// add pagination
blogRouter.get('/bulk' , async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    orderBy : {
      createdAt : 'desc'
    },
    select: {
      id : true,
      title : true,
      content : true,
      author : {
        select : {
          name : true
        }
      }
    }
  })

  return c.json({
    blogs
  })
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const id = c.req.param('id')

  try{
    const blog = await prisma.post.findFirst({
      where : {
        id : id
      },
      select : {
        id : true,
        title : true,
        content : true,
        author : {
          select : {
            name : true
          }
        }
      }
    })

    if(blog){
      return c.json({
        blog
      })
    }
    
    return c.json({
      message : "No blog with this id found"
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  }
})

blogRouter.get('/users/me/blogs' , async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const userId = c.get("userId")

  try{
    const blogs = await prisma.post.findMany({
      where : {
        authorId : userId 
      }
    })

    c.status(200)
    return c.json({
      blogs
    })
  }catch(err){
    return c.status(503)
  }
})

// blogRouter.post('/deleteAll' , async (c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate())


//   await prisma.post.deleteMany()

//   return c.json({
//     message : "Cleared"
//   })
// })

// blogRouter.post('/delete/:id' , async(c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate())

//   const id = c.req.param('id')

//   await prisma.post.delete({
//     where : {
//       id
//     }
//   })

//   return c.json({
//     deleted : id
//   })
// })

// blogRouter.put('/dummy' , async(c)=>{
//   const body = await c.req.json()
//   return c.json({
//     body
//   })
// })

export default blogRouter