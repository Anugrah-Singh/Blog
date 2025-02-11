import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { Container,PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
    }, [])})

    if(posts.length === 0){
        <div>
            <Container>
                <h1 className='text-2xl font-bold'>No posts found</h1>
            </Container>
        </div>
    }
    return (
        <div className='flex flex-wrap'>
            <Container>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </Container>
        </div>
    )
}


export default Home