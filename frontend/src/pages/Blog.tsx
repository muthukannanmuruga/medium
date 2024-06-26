import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Outerblog } from "../components/Outerblog";
import { BlogPost } from "../Interfaces/AuthInterfaces"
import { OuterblogSkeleton } from '../components/Outerblogskeleton';
import { useRecoilValue } from 'recoil';
import { usernameToStoreinrecoil } from './recoilState';

export const Blog = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]); // Specify the type as BlogPost[]
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://backend.mediumapp.workers.dev/api/v1/blog/bulk', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    const sortedBlogs = response.data.posts; // Already sorted in ascending order
                    setBlogs(sortedBlogs.reverse()); // Reverse the order of the sorted blogs array
                } else {
                    console.error('Failed to fetch blogs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogs();
    }, []);

    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)
    const finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';

    if (loading) {
        return (
            <div>
                <Appbar UserInitial={finaluserInitial} />
                {/* Render skeleton components while loading */}
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
            </div>
        );
    }

    return (
        <div>
            <Appbar UserInitial={finaluserInitial} />
            {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <Outerblog
                        key={index}
                        title={blog.title}
                        content={blog.content}
                        publishedOn={blog.publishedOn}
                        User={blog.authorName}
                        postid={blog.post_id}
                    />
                ))
            ) : (
                <div className='flex flex-row justify-center text-extrabold'>No blogs found</div>
            )}
        </div>
    );
};

export default Blog;
