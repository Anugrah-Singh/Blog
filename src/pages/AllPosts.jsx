import React, { useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([])
    useEffect(() => {}, [])
    service.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
}}).catch()
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap -mx-4'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts