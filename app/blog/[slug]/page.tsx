"use client"

import axios from "axios"
import { useEffect, useState } from "react"

interface Post {
  id: string
  content: string
}

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post>({
    id: "",
    content: ""
  })

  
  

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${params.slug}`)
      console.log(response.data);
      setPost(response.data.post)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPost();
  }, [])
  
  return <div>My Post: {params.slug}
  <p>{post.content}</p></div>
}
