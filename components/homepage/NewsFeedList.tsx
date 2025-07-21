import React, {useEffect, useState} from "react";
import axios from "axios";

export default function NewsFeedList() {
    interface Post {
        author_id: number;
        author_name: string;
        title: string;
        description: string;
        created_at?: string;
        updated_at?: string;
    }

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://social-backend.local/api/posts", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => {
                setPosts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center py-6">Loading...</p>;

    return (
        <div className="flex flex-col gap-6">
            {posts.map((post, index) => (
                <section
                    key={index}
                    className="flex justify-center px-4 py-6 bg-gray-100 w-full"
                >
                    <div className="bg-white rounded-xl shadow-md w-full max-w-2xl">
                        <div className="p-4">
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
                                    className="w-10 h-10 rounded-full mr-3 border"
                                    alt="Avatar"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {post.author_name}
                                    </p>
                                    <p className="text-sm text-gray-500">10h ago</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-800 mb-4">{post.description}</p>
                        </div>

                        {/* Interactions */}
                        <div className="px-4 pt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-thumbs-up text-blue-500"></i>
                                    <i className="fas fa-heart text-red-500"></i>
                                    <span>124</span>
                                </div>
                                <span className="text-gray-500">8 comments</span>
                            </div>

                            <div className="flex border-y text-gray-700 divide-x">
                                <button className="flex-1 py-2 flex items-center justify-center hover:bg-gray-100">
                                    <i className="fas fa-thumbs-up mr-2"></i> Like
                                </button>
                                <button className="flex-1 py-2 flex items-center justify-center hover:bg-gray-100">
                                    <i className="fas fa-comment-alt mr-2"></i> Comment
                                </button>
                                <button className="flex-1 py-2 flex items-center justify-center hover:bg-gray-100">
                                    <i className="fas fa-share mr-2"></i> Share
                                </button>
                            </div>
                        </div>

                        {/* Comment input */}
                        <div className="p-4">
                            <div className="flex items-start space-x-3">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
                                    className="w-10 h-10 rounded-full border"
                                    alt="Avatar"
                                />
                                <div className="flex-1">
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={2}
                                        placeholder="Write a comment..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
