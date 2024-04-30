import { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import axios from "axios";
import { OuterblogSkeleton } from "./Outerblogskeleton";
import { useParams } from "react-router-dom";

interface Blog {
    userDescription: string;
    title: string;
    content: string;
    publishedOn: string;
    authorName: string;
    // Add other properties if needed
}

export const InnerBlog = () =>
    {   
        const [blog, setBlog] = useState<Blog | null>(null);
        const [loading, setLoading] = useState(true);
        const { id } = useParams<{ id: string }>();

        useEffect(() => {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`https://backend.mediumapp.workers.dev/api/v1/blog/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                   
                    if (response.status === 200) {
                        setBlog(response.data.posts); // Assuming the response data is the blog object
                    } else {
                        console.error('Failed to fetch blog:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching blog:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBlog();
        }, []);

        let publishedDate = blog?.publishedOn?.split(' ');
        let date: string | undefined;
        if (publishedDate && publishedDate.length > 0) {
            date = publishedDate[0];
        } else {
            date = undefined;
        }
        const authorInitial = blog?.authorName ? blog.authorName.trim().charAt(0).toUpperCase() : 'A';

        if(loading){
            return (
                <div>
                    <Appbar UserInitial={authorInitial} />
                    <OuterblogSkeleton/>
                    <OuterblogSkeleton/>
                    <OuterblogSkeleton/>
                    <OuterblogSkeleton/>
                    <OuterblogSkeleton/>
                    
                </div>
                   
            );
        }
        if (!blog) {
            return <div className='flex flex-row justify-center h-screen items-center font-extrabold '>No blogs found</div>
        }

        return <div >
            <Appbar UserInitial={"M"}/>
            <div className="h-auto flex flex-row justify-center mx-10 py-20">
                <div className="w-2/3  px-5 mx-5">
                    <div className="font-extrabold text-4xl">
                        {blog.title}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">
                        Posted on {date}
                    </div>
                    <div className="mt-4 text-gray-700 text-base">
                        {blog.content}
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="font-bold text-gray-800">
                        Author
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <div className="text-base font-bold text-gray-800 rounded-full h-7 w-7 flex items-center justify-center bg-gray-300">
                            {authorInitial}
                        </div>
                        <div className="mx-3 px-3">
                            <div className="font-semibold text-xl">
                                {blog.authorName}
                            </div>
                            <div className="text-base pt-1 text-slate-500 max-w-80 overflow-hidden overflow-ellipsis">
                                {blog.userDescription}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    }