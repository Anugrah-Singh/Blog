import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // Handle featured image separately
                    if (post.featuredImage) {
                        const timestamp = new Date().getTime();
                        service.getFilePreview(post.featuredImage)
                            .then(url => setImageUrl(`${url}?t=${timestamp}`));
                    }
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            if (window.confirm("Are you sure you want to delete this post?")) {
                const status = await service.deletePost(post.$id);
                if (status) {
                    if (post.featuredImage) {
                        await service.deleteFile(post.featuredImage);
                    }
                    navigate("/");
                } else {
                    throw new Error("Failed to delete post");
                }
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            // Optionally add user notification here
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}