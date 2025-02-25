import React from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = React.useState({})
    const {slug} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        if(slug){
            service.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost