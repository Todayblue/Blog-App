"use client"

import React, { useEffect, useState } from 'react'
import Card from '../components/cardShow/Card'
import axios from 'axios';


interface Post {
  id: string
  content: string
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Post[]>([])

  const getBlogs = async () => {
    try {
      const response = await axios.get('/api/blog')
      console.log(response.data);
      setBlogs(response.data.blog)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <>

      <div className='container mx-auto grid grid-cols-3 gap-10 mt-20 '>
        {blogs.map(blog =>
          <Card key={blog.id} content={blog.content} id={blog.id} />
        )}
      </div>
      {/* {blogs.map(post => (
        <div key={post.id}>
          <Link href={`http://localhost:3000/blogs/${post.id}`}> Click</Link>
        </div>
      ))} */}
    </>
  )
}

export default Blog

