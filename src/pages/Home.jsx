import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    service.getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Container>
          <div className="flex items-center justify-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Container>
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <h1 className="text-3xl font-bold text-gray-100">No posts found</h1>
            <p className="text-gray-400">Be the first one to create a post!</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-gray-100">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home