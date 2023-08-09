// import getBlogsById from '@/app/api/post/[id]/route';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface Post {
  id: string
  content: string
}

interface Data {
  id: string
  content: string
}

const Card = ({ id, content }: Data) => {

  const cleanBody = content && content.replace(
    /<br\s?\/?>|<u\s?\/?>|<strong\s?\/?>|<em\s?\/?>/g,
    ""
  );
  console.log(cleanBody);

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


  // const slug = '121'

  return (
    
    <div className="card w-96 bg-base-100 shadow-xl ">
      <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
      <div className="card-body ">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: cleanBody }} className="line-clamp" ></div>
        <div className="card-actions justify-end">
          <Link className="badge badge-outline" href={`http://localhost:3000/posts/${id}`}>read more...</Link>
        </div>
      </div>
    </div>

  )
}

export default Card
